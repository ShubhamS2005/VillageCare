import express from "express"
import { DeleteJourney, getAllJourneys, GetUserJourney, postJourney, UpdateJourneysStatus } from "../controllers/journeyController.js"
import {isAdminAuthenticated, isTouristAuthenticated} from "../middleware/auth.js"

const appointment_router =express.Router()

appointment_router.post("/post",isTouristAuthenticated,postJourney)

appointment_router.get("/getall",isAdminAuthenticated,getAllJourneys)
appointment_router.put("/update/:id",isAdminAuthenticated,UpdateJourneysStatus)
appointment_router.delete("/delete/:id",isAdminAuthenticated,DeleteJourney)

appointment_router.get("/get-appointment/:id",isTouristAuthenticated,GetUserJourney)













export default appointment_router