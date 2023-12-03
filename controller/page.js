exports.getmainpage = async (req, res) => {
    try {
       res.sendFile('index.html',{root:'views'})
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}
exports.getloginpage = async (req, res) => {
    try {
       res.sendFile('login.html',{root:'views'})
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}
exports.getsignuppage = async (req, res) => {
    try {
       res.sendFile('signup.html',{root:'views'})
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}
exports.getforgotpage = async (req, res) => {
    try {
       res.sendFile('forgot-password.html',{root:'views'})
    } catch (e) {
  
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}
exports.getresetpage = async (req, res) => {
    try {
       res.sendFile('reset-password.html',{root:'views'})
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}
exports.getreportpage = async (req, res) => {
    try {
       res.sendFile('report.html',{root:'views'})
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}