import sys, smtplib

if (sys.version_info > (3, 0)):
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
else:
    from email.MIMEMultipart import MIMEMultipart  # @Reimport
    from email.MIMEText import MIMEText

"""
    @TODO: Set up an SMTP server on the VPS so we don't have to use cock.li
"""

class SMTPEmailer:
    def __init__(self):
        self.smtpObj = smtplib.SMTP('mail.cock.li', 587)
        self.smtpObj.ehlo()
        self.smtpObj.starttls()
        self.smtpObj.ehlo()
        self.smtpObj.login("ovondev@airmail.cc", "3QdPou9MyoVaODlh")
    def sendmail(self, username, email, code):
        msg = MIMEMultipart()
        msg['From'] = "Online Volunteer Opportunity Network <ovondev@airmail.cc>"
        msg['To'] = "%s <%s>" % (username, email)
        msg['Subject'] = "Password reset for %s" % username
        body = """Someone has requested a password reset for this account.
Please visit this link to verify your account:
http://localhost:8090/#/resetpassword/%s

If you did not request a password reset, please disregard this email.
""" % code

        msg.attach(MIMEText(body, 'plain'))

        try:
            self.smtpObj.sendmail("ovondev@airmail.cc", email, msg.as_string())                 
            print("Successfully sent email")
            return True
        except smtplib.SMTPException:
            print("Error: unable to send email")
            return False
    
if __name__ == "__main__":
    emailer = SMTPEmailer()
    emailer.sendmail("Eric", "kuzer200@uregina.ca", 1234567)