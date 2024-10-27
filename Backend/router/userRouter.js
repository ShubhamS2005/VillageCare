import express from "express"
import {UserRegister,login,GetAllRural,GetService,GetAllService,GetUser,LocalAdminLogout,AddNewAdmin,AdminLogout,ServiceLogout,ruralLogout, UpdateElementId, GetServicePerson, GetAllDoctors} from "../controllers/userController.js"
import {isAdminAuthenticated,isLocalAdminAuthenticated,isRuralAuthenticated,isServiceAuthenticated} from "../middleware/auth.js"


const user_router =express.Router()

// common use
user_router.post("/register",UserRegister)
user_router.post("/login",login)
// user_router.put("/update/:id",UpdateUserElement)



// Admin Specific
user_router.post("/admin/addnew",isAdminAuthenticated,AddNewAdmin)
user_router.get("/admin/logout",isAdminAuthenticated,AdminLogout)
user_router.get("/admin/me",isAdminAuthenticated,GetUser)


// Local Admin Specific
user_router.put("/update/:id",UpdateElementId)

user_router.get("/localAdmin/logout",isLocalAdminAuthenticated,AdminLogout)
user_router.get("/localAdmin/me",isLocalAdminAuthenticated,GetUser)

// Rural Specific
user_router.get("/rural/me",isRuralAuthenticated,GetUser)
user_router.get("/rural/logout",isRuralAuthenticated,ruralLogout)
user_router.get("/rural",GetAllRural)
user_router.get("/me",isRuralAuthenticated,GetUser)
user_router.get("/get-service/:id",GetService)





// Guide Specific
user_router.get("/Service/me",isServiceAuthenticated,GetUser)
user_router.get("/Service/logout",isServiceAuthenticated,ServiceLogout)
user_router.get("/services",GetAllService)
user_router.get("/doctors",GetAllDoctors)

user_router.get("/get-service/:id",GetServicePerson)




// // Feedback
// user_router.post("/sendMessage",sendMessage)
// user_router.get("/getallmessages",isAdminAuthenticated,GetAllMessages)





export default user_router