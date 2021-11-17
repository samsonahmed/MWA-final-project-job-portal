var nodemailer = require('nodemailer');
process.on('message', function (email){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'wushuramato@gmail.com',
          pass: 'biyaxwkzvofizaqq'
        }
      });
      var mailOptions = {
        from: 'abitmanabitman@gmail.com',
        to: email.toString(),
        subject:'Next Process for job application',
        text: 'congratulation you passed for interview'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      process.send("sent")
      process.exit(1);
})
