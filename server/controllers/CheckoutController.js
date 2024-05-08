// const fs = require("fs");
// const Checkout = require("../models/Checkout")
// const User = require("../models/User")
// const transporter = require("../mailTransporter")
// const nodemailer = require("nodemailer");
// const Razorpay = require("razorpay");
// const PDFDocument = require("pdfkit");
// const { MongoClient } = require('mongodb');



// async function sendEmail(receiver, subject, text, userDetails) {
//     try {
//       let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com", // SMTP server address
//         port: 587, // Port
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: "hayatrafie007@gmail.com",
//           pass: "jgbuznnziwohgouj",
//         },
//         tls: {
//           rejectUnauthorized: false,
//         },
//       });
  
//       let info = await transporter.sendMail({
//         from: '"Shoppable" <hayatrafie007@gmail.com>',
//         to: receiver,
//         subject: subject,
//         html: text,
//       });
  
//       console.log("Email sent: %s", info.messageId);
//     } catch (error) {
//       console.log("Error occurred while sending email: ", error);
//     }
//   }
  
//   function order(req, res) {
//     try {
//       const instance = new Razorpay({
//         key_id: process.env.RPKEYID,
//         key_secret: process.env.RPSECRETKEY,
//       });
  
//       const options = {
//         amount: req.body.amount * 100,
//         currency: "INR",
//       };
  
//       instance.orders.create(options, (error, order) => {
//         if (error) {
//           console.log(error);
//           return res
//             .status(500)
//             .json({ result: "Fail", message: "Something Went Wrong!" });
//         }
//         res.status(200).json({ result: "Done", data: order });
//       });
//     } catch (error) {
//       res.status(500).json({ result: "Fail", message: "Internal Server Error!" });
//       console.log(error);
//     }
//   }
  
//   async function verifyOrder(req, res) {
//     try {
//       let check = await Checkout.findOne({ _id: req.body.checkid });
//       check.rppid = req.body.razorpay_payment_id;
//       check.paymentstatus = "Done";
//       check.paymentmode = "Net Banking";
//       await check.save();
  
//       const user = await User.findOne({ _id: check.userid });
//       let userDetails = `
    
//       <div style="width: 80%; margin: 30px auto; background-color: #fff; padding: 10px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//         <div style="border-top: 1px solid #ccc; margin-top: 5px; padding-top: 5px;">
//         <h2 style="color: #333; margin-bottom: 10px;"><i class="fas fa-truck" style="margin-right: 10px; color: #333;"></i>Congratulations Your order Has Been Placed </h2>
//           <h2 style="color: #333; margin-bottom: 10px;"><i class="fas fa-truck" style="margin-right: 10px; color: #333;"></i>Shipping Address</h2>
//           <p style="margin-bottom: 10px; color: #666;"><strong>Name:</strong>${user.name}</p>
//           <p style="margin-bottom: 10px; color: #666;"><strong>Address1:</strong>${user.address}</p>
//           <p style="margin-bottom: 10px; color: #666;"><strong>Address2:</strong>${user.phone}</p>
//            <p style="margin-bottom: 10px; color: #666;"><strong>State:</strong>${user.state}</p>
//           <p style="margin-bottom: 10px; color: #666;"><strong>City:</strong>${user.city}</p>
//           <p style="margin-bottom: 10px; color: #666;"><strong>Zip Code:</strong>${user.pin}</p>
//         </div>
//       </div>
//       `;
  
//       check.products.forEach((product) => {
//         userDetails += `
//         <div style="width: 80%; margin: 30px auto; background-color: #fff; padding: 10px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//                  <div style="border-top: 1px solid #ccc; margin-top: 5px; padding-top: 5px;"> 
//           <h2 style="color: #333; margin-bottom: 10px;"><i class="fas fa-truck" style="margin-right: 10px; color: #333;"></i>Product Details</h2>
//                   <p style="margin-bottom: 10px; color: #666;"><strong>Product Name:</strong>${product.name}</p>
//           <p style="margin-bottom: 10px; color: #666;"><strong> Product Brand:</strong>${product.brand}</p>
//           <p style="margin-bottom: 10px; color: #666;"><strong>Product Color:</strong>${product.color}</p>
//           <p style="margin-bottom: 10px; color: #666;"><strong>Product Size:</strong>${product.size}</p>
//            <p style="margin-bottom: 10px; color: #666;"><strong>Product Quantity:</strong>${product.qty}</p>
//           <p style="margin-bottom: 10px; color: #666;"><strong>Total Amount:</strong>${product.total}</p>
//                    </div>
//                    </div>
//               `;
//       });
  
//       userDetails += `<li className=Suc>Payment Status: ${check.paymentstatus}</li></ul>`;
  
//       await sendEmail(user.email, "Payment Success", userDetails);
  
//       await sendEmail(
//         "rafiehayat5@gmail.com",
//         "Product Details",
//         userDetails
//       );
  
//       const userInfo = await User.findOne({ _id: check.userid });
//       const checkOut = await Checkout.findOne({ _id: req.body.checkid });
  
//       const doc = new PDFDocument();
  
//       let pdfBuffer = null;
  
//       const pdfPath = `./orderDetails_${userInfo.name}_${Date.now()}.pdf`;
//       const pdfStream = fs.createWriteStream(pdfPath);
  
//       doc.pipe(pdfStream);
  
//       doc.font("Helvetica");
  
//       doc.fontSize(16).text("Order Invoice", { align: "center" });
  
//       doc.moveDown();
  
//       doc.fontSize(12).text("User ID:", { continued: true }).text(userInfo._id);
//       doc.moveDown();
//       doc.text("User Name:", { continued: true }).text(userInfo.name);
//       doc.moveDown();
//       doc.text("User Email:", { continued: true }).text(userInfo.email);
//       doc.moveDown();
//       doc.text("User Phone:", { continued: true }).text(userInfo.phone);
//       doc.moveDown();
//       doc.text("User Address:", { continued: true }).text(userInfo.address);
//       doc.moveDown();
//       doc.text("State:", { continued: true }).text(userInfo.state);
//       doc.moveDown();
//       doc.text("City:", { continued: true }).text(userInfo.city);
//       doc.moveDown();
//       doc.text("PIN:", { continued: true }).text(userInfo.pin);
//       doc.moveDown();
//       doc.text("Payment Mode:", { continued: true }).text(checkOut._id);
//       doc.moveDown();
//       doc.text("Payment Mode:", { continued: true }).text(checkOut.paymentmode);
//       doc.moveDown();
//       doc.text("Order Status:", { continued: true }).text(checkOut.orderstatus);
//       doc.moveDown();
//       doc.text("Subtotal:", { continued: true }).text(checkOut.subtotal);
//       doc.moveDown();
//       doc.text("Shipping:", { continued: true }).text(checkOut.shipping);
//       doc.moveDown();
//       doc.text("Total:", { continued: true }).text(checkOut.total);
//       doc.moveDown();
//       doc.text("Date:", { continued: true }).text(checkOut.date);
  
//       doc.end();
  
//       const buffers = [];
//   doc.on('data', buffers.push.bind(buffers));
//   doc.on('end', () => {
//       const pdfBuffer = Buffer.concat(buffers);
//       saveToDatabase(pdfBuffer,userInfo,checkOut);
//   });
  
//   async function saveToDatabase(pdfData) {
//     try {
//         const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();
  
//         const database = client.db('shoppable');
//         const collection = database.collection('invoices');
  
  
//       const document = {
//         UserName: userInfo.name,
//         CheckOut: [checkOut._id,checkOut.orderstatus,checkOut.paymentmode],
//         pdfData: pdfData
//     };
  
//         await collection.insertOne(document);
  
  
//         console.log('PDF saved to database.');
  
//         await client.close();
//     } catch (error) {
//         console.error('Error saving PDF to database:', error);
//     }
//   }
  
//       res.status(200).send({ result: "Done" });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Internal Server Error!" });
//     }
//   }
  

// async function getRecord(req,res){
//     try{
//         let data = await Checkout.find().sort({_id:-1})
//         res.send({status:200,result:"Done",count:data.length,data:data})
//     } catch(error) {
//         res.send({status:500,result:"failed",message:"Internal Server Error"})
//     }
// }

// async function getUserRecord(req,res){
//     try{
//         let data = await Checkout.find({userid:req.params.userid}).sort({_id:-1})
//         res.send({status:200,result:"Done",count:data.length,data:data})
//     } catch(error) {
//         res.send({status:500,result:"failed",message:"Internal Server Error"})
//     }
// }

// async function createRecord(req,res){
//      try{
//         const data = new Checkout(req.body)
//         data.date = new Date()
//         await data.save()
//        res.send({status:200,result:"Done",data:data})

//        const user = await User.findOne({_id:data.userid})
//        mailOptions = {
//         from: process.env.MAIL_SENDER,
//         to: user.email,
//         subject:"Order Is Placed : Team Shoppable",
//         text:`
//                 Hello ${user.name}
//                 Thanks To shop With Us.
//                 Your Order Has Been Placed
//                 Now You Can track Your Order In Profile Section
//                 Team : Shoppable
//                `
//     }
//     transporter.sendMail(mailOptions,((error)=>{
//         if(error){
//             console.log(error)
//             //res.send({ status: 401, result: "failed", message: "Invalid Email Address"})
//         }
//     }))
//      } catch (error){
//          if(error.errors.userid)
//         res.send({status:400,result:"failed",message:error.errors.userid.message})
//         else if(error.errors.subtotal)
//         res.send({status:400,result:"failed",message:error.errors.subtotal.message})
//         else if(error.errors.shipping)
//         res.send({status:400,result:"failed",message:error.errors.shipping.message})
//         else if(error.errors.total)
//         res.send({status:400,result:"failed",message:error.errors.total.message})
//         else
//         res.send({status:500,result:"failed",message:"Internal Server Error"})
//      }
// }

// async function getSingleRecord(req,res){
//     try{
//         let data = await Checkout.findOne({_id:req.params._id})
//         if(data)
//         res.send({status:200,result:"Done",data:data})
//         else
//         res.send({status:404,result:"Result",message:"Record not Found"})
//     } catch(error) {
//         res.send({status:500,result:"failed",message:"Internal Server Error"})
//     }
// }

// async function updateRecord(req,res){
//     try{
//         let data = await Checkout.findOne({_id:req.params._id})
//         if(data){
//         data.orderstatus = req.body.orderstatus??data.orderstatus
//         data.paymentmode = req.body.paymentmode??data.paymentmode
//         data.paymentstatus = req.body.paymentstatus??data.paymentstatus
//         data.rppid = req.body.rppid??data.rppid
//         await data.save()
//         res.send({status:200,result:"Done",message:"Record Updated"})
//        } 
//         else
//         res.send({status:404,result:"Result",message:"Record Not Found"})
//     } catch(error) {
//         res.send({status:500,result:"failed",message:"Internal Server Error"})
//     }
// }
// async function deleteRecord(req,res){
//     try{
//         let data = await Checkout.findOne({_id:req.params._id})
//         if(data){
//         await data.deleteOne()
//         res.send({status:200,result:"Done",message:"Record Deleted"})
//         }
//         else
//         res.send({status:404,result:"Result",message:"Record not Found"})
//     } catch(error) {
//         res.send({status:500,result:"failed",message:"Internal Server Error"})
//     }
// }


// module.exports = {
//     getRecord:getRecord,
//     getUserRecord:getUserRecord,
//     createRecord:createRecord,
//     getSingleRecord:getSingleRecord,
//     updateRecord:updateRecord,
//     deleteRecord:deleteRecord,
//     order:order,
//     verifyOrder:verifyOrder
// }






const Checkout = require("../models/Checkout")
const User = require("../models/User")
const transporter = require("../mailTransporter")

const Razorpay = require("razorpay")

//Payment API
async function order(req, res) {
    try {
        const instance = new Razorpay({
            key_id: process.env.RPKEYID,
            key_secret: process.env.RPSECRETKEY,
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR"
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

async function verifyOrder(req, res) {
    try {
        var check = await Checkout.findOne({ _id: req.body.checkid })
        check.rppid = req.body.razorpay_payment_id
        check.paymentstatus = "Done"
        check.paymentmode = "Net Banking"
        await check.save()
        res.status(200).send({ result: "Done" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

async function getRecord(req, res) {
    try {
        let data = await Checkout.find().sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}
async function getUserRecord(req, res) {
    try {
        let data = await Checkout.find({userid:req.params.userid}).sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingleRecord(req, res) {
    try {
        let data = await Checkout.findOne({_id:req.params._id}).sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function createRecord(req, res) {
    try {
        const data = new Checkout(req.body)
        data.date = new Date()
        await data.save()
        res.send({ status: 200, result: "Done", data: data })

        const user = await User.findOne({_id:data.userid})
        mailOptions = {
            from: process.env.MAIL_SENDER,
            to: user.email,
            subject: "Order is Placed : Team Kifayti",
            text: `
                    Hello ${user.name}
                    Thanks to Shop With Us. 
                    Your Order has Been Placed
                    Now You tract your order in profile seciton
                    Team : kifayti
                `
        }
        transporter.sendMail(mailOptions, ((error) => {
            if (error) {
                console.log(error)
                // res.send({ status: 401, result: "Fail", message: "Invalid Email Address" })
            }
        }))
    } catch (error) {
        if (error.errors.userid)
            res.send({ status: 400, result: "Fail", message: error.errors.userid.message })
        else if (error.errors.subtotal)
            res.send({ status: 400, result: "Fail", message: error.errors.subtotal.message })
        else if (error.errors.shipping)
            res.send({ status: 400, result: "Fail", message: error.errors.shipping.message })
        else if (error.errors.total)
            res.send({ status: 400, result: "Fail", message: error.errors.total.message })
        else
            res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}


async function updateRecord(req, res) {
    try {
        let data = await Checkout.findOne({ _id: req.params._id })
        if (data) {
            data.orderstatus = req.body.orderstatus ?? data.orderstatus
            data.paymentmode = req.body.paymentmode ?? data.paymentmode
            data.paymentstatus = req.body.paymentstatus ?? data.paymentstatus
            data.rppid = req.body.rppid ?? data.rppid
            await data.save()
            res.send({ status: 200, result: "Done", message: "Record Updated" })
        }
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Checkout.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.send({ status: 200, result: "Done", message: "Record is Deleted" })
        }
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

module.exports = {
    getRecord: getRecord,
    createRecord: createRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    getUserRecord:getUserRecord,
    getSingleRecord:getSingleRecord,
    order:order,
    verifyOrder:verifyOrder
}