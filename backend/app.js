const date = require('date-and-time');
const express = require('express');
//const config = require('config');
const bodyParser = require("body-parser");
var mysql = require('mysql');
var cors = require('cors');
const house = require('./routes/api/house');


const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({extended: false}));
app.use('/api/house', house);

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "smart_apartment",
  port: 3306
});
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM userdb", function(err, result, fields) {
    if (err) throw err;
  });
});




//----login Authentication setup----
app.use('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  con.query("SELECT * FROM userdb where username = '" + username + "'", function(err, result, fields) {
    if (err) throw err;
    if (result.length === 0) {
      res.send({
        token: 'failure'
      });
    } else if (password === result[0]['password']) {
      res.send({
        token: 'success',
        username: result[0]['username'],
        fname: result[0]['first_name'],
        lname: result[0]['last_name'],
        role: result[0]['role'],
        userid: result[0]['userid']
      });
    } else {
      res.send({
        token: 'failure'
      });
    }
  });

});
var c = 0;
app.use('/services', (req, res) => {
  const role = req.body.role;
  con.query("SELECT service_name, service_desc FROM service s, relation r where r.service_id = s.service_id and r.role = '" + role + "'", function(err, result, fields) {
    if (err) throw err;
    var data = []
    result.forEach(function(e, i) {
      data.push({
        "service_name": e.service_name,
        "service_desc": e.service_desc
      })
    })
    res.send(data);

  });


});

function completeEvent() {
  con.query("UPDATE events SET status='completed' where event_date < curdate() ");
  con.query("UPDATE events SET status='completed' where event_date = curdate() and event_time <= current_time()");
}
//Events database
app.use('/events', (req, res) => {
  completeEvent()
  con.query("SELECT * FROM events e, userdb u where e.user = u.userid and status='active' order by e.event_date, e.event_time", function(err, result, fields) {
    if (err) throw err;
    var data = []
    result.forEach(function(e, i) {
      data.push({
        "event_id": e.event_id,
        "event_name": e.event_name,
        "host_fname": e.first_name,
        "host_lname": e.last_name,
        "event_date": new Date(e.event_date),
        "event_time": e.event_time,
        "event_venue": e.event_venue
      })
    })
    res.send(data);

  });
});

//Post Event
app.use('/postevent', (req, res) => {
  completeEvent()
  con.query("SELECT max(event_id) as event_id from events", function(err, result, fields) {
    if (err) throw err;
    const event_id = result[0]["event_id"] + 1

    con.query("INSERT into events VALUES ('" + event_id + "','" + req.body.event_name + "','" + req.body.event_date + "','" + req.body.event_time + "','" + req.body.event_venue + "','" + req.body.user + "','active')", function(err1, result1, fields1) {
      if (err1) throw err1;
      if (result1.affectedRows === 1)
        res.send("Success")
      else
        res.send("Failure")
    });
  });
});

app.use('/myevents/delete', (req, res) => {
  const id = req.body.event_id;

  completeEvent()
  con.query("UPDATE events SET status = 'cancelled' where event_id = '" + id + "'", function(err, result, fields) {
    if (err) throw err;
    if (result.affectedRows === 1)
      res.send("Success")
    else
      res.send("Failure")
  });
});
//MyEvents view
app.use('/myevents', (req, res) => {
  const id = req.body.user;
  completeEvent()
  con.query("SELECT * FROM events e, userdb u where e.user = u.userid AND e.user = " + id + " order by e.status", function(err, result, fields) {
    if (err) throw err;
    var data = []
    result.forEach(function(e, i) {
      data.push({
        "event_id": e.event_id,
        "event_name": e.event_name,
        "host_fname": e.first_name,
        "host_lname": e.last_name,
        "event_date": new Date(e.event_date),
        "event_time": e.event_time,
        "event_venue": e.event_venue,
        "event_status": e.status
      })
    })
    res.send(data);
  });
});

//Property database
app.use('/property',(req,res)=>{
	//const role = req.body.role;
	//console.log("in events")
	con.query("SELECT * FROM flatdb f, userdb u where f.ownerid = u.userid AND (status='sale' OR status='rent')", function (err, result, fields) {
    if (err) throw err;
	var data = []
	result.forEach(function(e, i){
		data.push( {"flatid" : e.flatid,
		"flatno":e.flatno,
		"blockno":e.blockno,
		"owner_fname": e.first_name,
		"owner_lname": e.last_name,
		"status": e.status,
    "bhk": e.bhk,
    "sqft": e.sqft
		})}
	)
	res.send(data);
  //console.log(data);
	});
});

//myads delete
app.use('/myads/delete', (req, res) => {
  const id = req.body.flatid;
  //console.log("id - >",id, req.body.flatid)
  con.query("UPDATE flatdb SET status = null where flatid = '" + id + "'", function(err, result, fields) {
    if (err) throw err;
    if (result.affectedRows === 1)
      res.send("Success")
    else
      res.send("Failure")
  });
});

app.use('/myprops/sell', (req, res) => {
  const id = req.body.flatid;
  //console.log("id - >",id, req.body.flatid)
  con.query("UPDATE flatdb SET status = 'sale' where flatid = '" + id + "'", function(err, result, fields) {
    if (err) throw err;
    if (result.affectedRows === 1)
      res.send("Success")
    else
      res.send("Failure")
  });
});

app.use('/myprops/rent', (req, res) => {
  const id = req.body.flatid;
  //console.log("id - >",id, req.body.flatid)
  con.query("UPDATE flatdb SET status = 'rent' where flatid = '" + id + "'", function(err, result, fields) {
    if (err) throw err;
    if (result.affectedRows === 1)
      res.send("Success")
    else
      res.send("Failure")
  });
});

//MyProps view
app.use('/myprops',(req,res)=>{
	//const role = req.body.role;
	const id = req.body.user;
  var data=[]
	con.query("SELECT * FROM flatdb f, userdb u where f.ownerid = u.userid AND f.ownerid = "+id+"", function (err, result, fields) {
    if (err) throw err;
	var data1 = []
  result.forEach(function(e, i){
		data1.push( {"flatid" : e.flatid,
		"flatno":e.flatno,
		"blockno":e.blockno,
		"owner_fname": e.first_name,
		"owner_lname": e.last_name,
		"status": e.status,
    "bhk": e.bhk,
    "sqft": e.sqft
		})}
	)
	//res.send(data);
  data.push(data1);
	});

  con.query("SELECT * FROM flatdb f, userdb u where f.ownerid = u.userid AND f.ownerid = "+id+" AND (status='sale' OR status='rent')", function (err, result, fields) {
    if (err) throw err;
  var data2 = []
  result.forEach(function(e, i){
    data2.push( {"flatid" : e.flatid,
    "flatno":e.flatno,
    "blockno":e.blockno,
    "owner_fname": e.first_name,
    "owner_lname": e.last_name,
    "status": e.status,
    "bhk": e.bhk,
    "sqft": e.sqft
    })}
  )
  data.push(data2);
  res.send(data);
  });
});





app.use('/bills',(req,res)=>{
	//const role = req.body.role;
	const id = req.body.user;
	con.query("select * from bills b, flatdb f, userdb u where b.flat_id=f.flatid AND u.userid="+id+" AND ((f.ownerid=u.userid AND f.tenantid IS NULL) OR (f.tenantid=u.userid));", function (err, result, fields) {
    if (err) throw err;
	var data = []

	result.forEach(function(e, i){
		data.push( {"flat_no" : e.flatno,
		"water":e.water,
    "gas":e.gas,
    "electricity":e.electricity,
    "area":e.sqft
	})}
	)
	res.send(data);
	});
});

app.use('/visitor', (req, res) => {
  con.query("SELECT v.first_name as first_name, v.last_name as last_name, v.mobile, temperature, visit_date, visit_time, u.first_name as fname, u.last_name as lname FROM visitors v, userdb u WHERE v.herefor = u.userid ORDER BY visit_date desc, visit_time desc", function(err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.use('/vehicle', (req, res) => {
  con.query("SELECT drivername, vehicleno, driverno, visit_date, visit_time, first_name , last_name FROM vehicles , userdb WHERE herefor = userid ORDER BY visit_date desc, visit_time desc", function(err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.use('/addvisitor',(req,res)=>{
  con.query("SELECT max(visitorid) as visitorid from visitors", function(err, result, fields) {
    if (err) throw err;
    const visitorid = result[0]["visitorid"] + 1

    con.query("INSERT into visitors VALUES ('" + visitorid + "','" + req.body.fname + "','" + req.body.lname+ "','" + req.body.mobile+ "','" + req.body.temp+ "','" + req.body.visit_date + "','" + req.body.visit_time + "','" +req.body.herefor + "')", function(err1, result1, fields1) {
      if (err1) throw err1;
      if (result1.affectedRows === 1)
        res.send("Success")
      else
        res.send("Failure")
    });
  });
});

app.use('/addvehicle',(req,res)=>{
  con.query("SELECT max(vehicleid) as vehicleid from vehicles", function(err, result, fields) {
    if (err) throw err;
    const vehicleid = result[0]["vehicleid"] + 1

    con.query("INSERT into vehicles VALUES ('" + vehicleid + "','" + req.body.vno + "','" + req.body.dname+ "','" + req.body.mobile+ "','" + req.body.visit_date + "','" + req.body.visit_time + "','" +req.body.herefor + "')", function(err1, result1, fields1) {
      if (err1) throw err1;
      if (result1.affectedRows === 1)
        res.send("Success")
      else
        res.send("Failure")
    });
  });
});

app.use('/dashboard/postcomplaint',(req,res)=>{
  con.query("SELECT max(complaintid) as complaintid from complaintdb", function(err1, result1, fields) {
    if (err1) throw err1;
    const complaintid = result1[0]["complaintid"] + 1
    //console.log(req.body)
    con.query("INSERT INTO complaintdb(complaintid,complaint,userid,flatno) values ('"+complaintid+"','"+req.body.complaint+"','"+req.body.userid+"','"+req.body.flatno+"')",function(err,result,fields){
      if(err) throw err;
      if(result.length==0){
        res.send('Failed');
      }
      else{
    	res.send('Success');
    	}
    	});
  });
});

app.use('/dashboard/complaint',(req,res)=>{
  	const role = req.body.role;
    const userid=req.body.id;
    if(role==='association'){
  con.query("SELECT c.complaintid,c.complaint,c.action,c.userid,c.flatno,u.first_name from complaintdb c, userdb u where c.userid=u.userid",function(err,result,fields){
  if(err) throw err;
    var data=[]

    result.forEach(function(e,i){
      data.push({"complaint":e.complaint,
      "complaintid":e.complaintid,
      "action":e.action,
      "userid":e.userid,
      "username":e.first_name,
      "flatno":e.flatno
    })
    })

    res.send(data);

  });}
  else{
  con.query("SELECT complaintid,complaint,action,userid,flatno from complaintdb where userid='"+userid+"'",function(err,result,fields){
    if(err) throw err;
    var data = []
    result.forEach(function(e, i) {
      data.push({
        "complaint": e.complaint,
        "complaintid": e.complaintid,
        "action": e.action,
        "userid": e.userid,
        "flatno": e.flatno
      })
    })
    res.send(data);
  });}
});


// app.use('/dashboard/postcomplaint',(req,res)=>{
//   con.query("SELECT max(complaintid) as complaintid from complaintdb", function(err1, result1, fields) {
//     if (err1) throw err1;
//     const complaintid = result1[0]["complaintid"] + 1
//     //console.log(req.body)
//     con.query("INSERT INTO complaintdb(complaintid,complaint,userid,flatno) values ('"+complaintid+"','"+req.body.complaint+"','"+req.body.userid+"','"+req.body.flatno+"')",function(err,result,fields){
//       if(err) throw err;
//       if(result.length==0){
//         res.send('Failed');
//       }
//       else{
//     	res.send('Success');
//     	}
//     	});
//   });
// });

// app.use('/dashboard/complaint',(req,res)=>{
//   	const role = req.body.role;
//     const userid=req.body.id;
//     if(role==='association'){
//   con.query("SELECT c.complaintid,c.complaint,c.action,c.userid,c.flatno,u.first_name from complaintdb c, userdb u where c.userid=u.userid",function(err,result,fields){
//   if(err) throw err;
//     var data=[]

//     result.forEach(function(e,i){
//       data.push({"complaint":e.complaint,
//       "complaintid":e.complaintid,
//       "action":e.action,
//       "userid":e.userid,
//       "username":e.first_name,
//       "flatno":e.flatno
//     })
//     })

//     res.send(data);

//   });}
//   else{
//   con.query("SELECT complaintid,complaint,action,userid,flatno from complaintdb where userid='"+userid+"'",function(err,result,fields){
//     if(err) throw err;
//     var data = []
//     result.forEach(function(e, i) {
//       data.push({
//         "complaint": e.complaint,
//         "complaintid": e.complaintid,
//         "action": e.action,
//         "userid": e.userid,
//         "flatno": e.flatno
//       })
//     })
//     res.send(data);
//   });}
// });

app.use('/dashboard/housekeeping',(req,res)=>{
	const role = req.body.role;
	con.query("SELECT servantid,first_name,last_name,status,work,request FROM housekeeping where status='available'", function (err, result, fields) {
    if (err) throw err;
	var data = []
	result.forEach(function(e, i){
		data.push( {"first_name" : e.first_name,
    "servantid":e.servantid,
		"last_name":e.last_name,
    "status":e.status,
    "work":e.work,
    "request":e.request
	})}
	)
	res.send(data);
	});
});

app.use('/complaint/resolve/action',(req,res)=>{
  const complaintid=req.body.complaintid;
  const action=req.body.action;
  con.query("UPDATE complaintdb SET action='"+action+"' WHERE complaintid='"+complaintid+"'",function(err,result,fields){
    if(err) throw err;
    res.send('Success');
  })
});

app.use('/housekeeping/request/confirm',(req,res)=>{
  const userid=req.body.servant.uid;
  const sid=req.body.servant.sid;
  con.query("UPDATE housekeeping SET request=(SELECT first_name from userdb where userid='"+userid+"') WHERE servantid='"+sid+"'",function(err,result,fields){
    if(err) throw err;
    res.send({status:'success'});
  })
});
// app.post("/addUser", (req, res) => {
//   const { first_name, last_name, username, password, mobile, role } = req.body;

//   // Check if all fields are provided
//   if (!first_name || !last_name || !username || !password || !mobile || !role) {
//       return res.status(400).json({ message: "All fields are required" });
//   }

//   const sql = "INSERT INTO userdb (first_name, last_name, username, password, mobile, role) VALUES (?, ?, ?, ?, ?, ?)";
  
//   con.query(sql, [first_name, last_name, username, password, mobile, role], (err, result) => {
//       if (err) {
//           console.error("Error inserting user:", err);
//           return res.status(500).json({ message: "Database error" });
//       }
//       res.json({ message: "User added successfully" });
//   });
// });

app.use('/addbill', (req, res) => {
  const role = req.body.role;
  if (role !== "association") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const { flat_id, water, gas, electricity } = req.body;

  const sql = "INSERT INTO bills (flat_id, water, gas, electricity) VALUES (?, ?, ?, ?)";
  con.query(sql, [flat_id, water, gas, electricity], (err, result) => {
    if (err) {
      console.error("Error adding bill:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Bill added successfully", bill_id: result.insertId });
  });
});

app.get('/clubhouse', (req, res) => {
  const facilities = [
    { name: 'Swimming Pool', description: 'Olympic-sized pool with temperature control.', image: 'images/gallery/swimming.jpg' },
    { name: 'Gym', description: 'Fully equipped fitness center with trainers.', image: 'images/gallery/gym.jpg' },
    { name: 'Banquet Hall', description: 'Spacious hall for events and gatherings.', image: 'images/gallery/banquet.jpg' }
  ];
  res.json(facilities);
});

app.get("/getUsers", (req, res) => {
  con.query("SELECT * FROM userdb", (err, result) => {  
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
      }
      res.json(result);
  });
});

// Add New User
app.post("/addUser", (req, res) => {
  const { first_name, last_name, username, password, mobile, role } = req.body;
  const sql = "INSERT INTO userdb (first_name, last_name, username, password, mobile, role) VALUES (?, ?, ?, ?, ?, ?)";
  
  con.query(sql, [first_name, last_name, username, password, mobile, role], (err, result) => {
      if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ error: "Failed to add user" });
      }
      res.json({ message: "User added successfully!", userid: result.insertId });
  });
});


// Update User
app.put("/updateUser/:userid", (req, res) => {
  const { first_name, last_name, username, mobile, role } = req.body;
  const sql = "UPDATE userdb SET first_name=?, last_name=?, username=?, mobile=?, role=? WHERE userid=?";
  
  con.query(sql, [first_name, last_name, username, mobile, role, req.params.userid], (err) => {
      if (err) {
          console.error("Update error:", err);
          return res.status(500).json({ error: "Failed to update user" });
      }
      res.json({ message: "User updated successfully!" });
  });
});


// Delete User
app.delete("/deleteUser/:userid", (req, res) => {
  con.query("DELETE FROM userdb WHERE userid=?", [req.params.userid], (err) => {
      if (err) {
          console.error("Delete error:", err);
          return res.status(500).json({ error: "Failed to delete user" });
      }
      res.json({ message: "User deleted successfully!" });
  });
});




app.use('/getFlats', (req, res) => {
  con.query("SELECT * FROM flatdb", (err, result) => {
      if (err) {
          console.error("Database error:", err);
          res.status(500).json({ error: "Database query failed" });
      } else {
          res.json(result);
      }
  });
});
app.post('/addFlat', (req, res) => {
  const { blockno, flatno, ownerid, tenantid, status, bhk, sqft } = req.body;

  const sql = "INSERT INTO flatdb (blockno, flatno, ownerid, tenantid, status, bhk, sqft) VALUES (?, ?, ?, ?, ?, ?, ?)";
  con.query(sql, [blockno, flatno, ownerid, tenantid, status, bhk, sqft], (err, result) => {
    if (err) throw err;
    res.json({ message: "Flat added successfully", flatid: result.insertId });
  });
});
app.put('/updateFlat/:flatid', (req, res) => {
  const { flatid } = req.params;
  const { blockno, flatno, ownerid, tenantid, status, bhk, sqft } = req.body;

  const sql = "UPDATE flatdb SET blockno = ?, flatno = ?, ownerid = ?, tenantid = ?, status = ?, bhk = ?, sqft = ? WHERE flatid = ?";
  con.query(sql, [blockno, flatno, ownerid, tenantid, status, bhk, sqft, flatid], (err, result) => {
    if (err) throw err;
    res.json({ message: "Flat updated successfully" });
  });
});
app.delete('/deleteFlat/:flatid', (req, res) => {
  const { flatid } = req.params;

  const sql = "DELETE FROM flatdb WHERE flatid = ?";
  con.query(sql, [flatid], (err, result) => {
    if (err) throw err;
    res.json({ message: "Flat deleted successfully" });
  });
});




app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(8082, () => console.log("Server running on port 8082"));
