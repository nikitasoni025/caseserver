import express  from "express";
import { subUserLogin, subUserReg } from "../Controller/subUser.js";

const router=express.Router();


// // Participants API Routes

router.post("/subuser/signup",subUserReg);
router.post("/subuser/signin",subUserLogin);

// router.post("/register",register);
// router.post("/signin",userSignin);
// router.post('/indi/regist',individualRegister);
// router.post('/group/regist',groupRegister);
// router.get('/groups',getAllGroup);
// router.get('/groups/user/',getAllGroupsWithUser);
// router.get("/participants",fetchParticipants);
// router.get("/paticipantsData",fetchParticipantsWithLimit);
// router.get('/partwid',fetchParticipantsWithId);
// router.get("/individuals",getAllIndividuals);
// router.get('/individuals/user',getAllIndiWithUser);


// // Payemnt API Routes

// router.post("/payment",createPaymentIntent);
// router.get("/paysuccess",paySuccess);
// router.post("/webhook",webhook);


// // Delete Routes
// router.delete('/user/delete/:id',deleteUser);
// router.delete('/indi/delete/:id',deleteIndividual);
// router.delete('/group/delete/:id',deleteGroup);




// // UPDATE ROUTES
// router.put('/user/update/',updateUser);
// router.put('/indi/update/',updateIndividual);
// router.put('/group/update/',updateGroup);


// // Admin Session Routes
// router.post('/admin/signup',adminregistration)
// router.post('/admin/login',adminSignin);
// router.get('/admin/check-session',adminChecksession);
// router.post('/admin/logout',adminLogout);
// router.get('/admin/get',getLoggedInAdmin);
// router.get('/admin/all',getAllAdmins);
// router.put('/admin/update',updateAdmin);
// router.delete('/admin/delete/:id',deleteAdmin);


// // upload routes
// router.post('/image/upload',uploadImageToImageKIt);
// router.delete('/imageimk/delete/:id',deleteImageFromImkit);


// // Post Routes
// router.post('/addpost',createPosts);
// router.get('/posts',fetchPostswithLimit);
// router.delete('/post/delete/:id',deletePost);
// router.get('/mypost/:id',fetchOnePost);



export default router;
