import express  from "express";
import { deleteAdmin, fetchAdminsWithEmail, fetchAdminsWithFilter, fetchAdminsWithId, getCokkie, subUserLogin, subUserLogout, subUserReg } from "../Controller/subUser.js";
import { createLuckyNum, getluckyNum, updateLuckyNumbers } from "../Controller/luckyNum.js";
import { verifyToken } from "../Middleware/tokenVerification.js";
import { addAd, fetchAdds, updateAd } from "../Controller/addsController.js";
import { addDayNight, deleteDayNight, fetchDayNight, updateDayNight } from "../Controller/dayNight.js";
import { createGuesingTable, fetchGuessingTable, updateGuessing } from "../Controller/guessingTableController.js";
import { createGame, deleteGame, fetchAllDeletedGames, fetchAllGames, fetchAllGamesWithLive, fetchAllGamesWithoutLimit, fetchGamesByfilter, updateGame, updateOneGame, updteSpecificGames } from "../Controller/gamesController.js";
import { createJodi, deleteJodi, deleteOuterJodi, fetchAllJodis, fetchJodi, updateJodi, updateOuterJodi } from "../Controller/jodiController.js";
import { createPanel, deleteOuterPanel, deletePanel, fetchAllPanel, fetchPanel, updateOuterPanel, updatePanel } from "../Controller/panelController.js";
import { addNetWeekly, fetchNetWeekly, updateNetWeekly } from "../Controller/netWeekly.js";

const router=express.Router();


// Sub User Api Routes
router.get('/subuser/get',fetchAdminsWithFilter);
router.get('/subuser/get/email',fetchAdminsWithEmail);
router.get('/subuser/get/id',fetchAdminsWithId);
router.post("/subuser/signup",subUserReg);
router.post("/subuser/signin",subUserLogin);
router.get("/subuser/logout",subUserLogout);
router.get('/getcookie',getCokkie);
router.delete('/subuser/delete/:id',deleteAdmin);


// Lucky Number Api Routes
router.post("/lucky/create",createLuckyNum);
router.get('/lucky/get',getluckyNum);
router.post('/lucky/update',updateLuckyNumbers);



// Ad Api Routes
router.post('/ad/create',addAd);
router.post('/ad/update',updateAd);
router.get('/ad/get',fetchAdds);


// Day Night Routes
router.post('/daynight/create',addDayNight);
router.post('/daynight/update',updateDayNight);
router.get('/daynight/get',fetchDayNight);
router.post('/daynight/delete',deleteDayNight);

// Net Weekly
router.get('/netweek/get',fetchNetWeekly);
router.post('/netweek/create',addNetWeekly);
router.post('/netweek/update',updateNetWeekly);

// Guessing Routes
router.get('/guessing/get',fetchGuessingTable);
router.post('/guessing/create',createGuesingTable);
router.post('/guessing/update',updateGuessing);


// Game Routes
router.get('/game/all',fetchAllGames);
router.get('/game/allwf',fetchAllGamesWithoutLimit);
router.get('/game/allwli',fetchAllGamesWithLive);
router.get('/game/all/deleted',fetchAllDeletedGames);
router.post('/game/create',createGame);
router.get('/game/owner',fetchGamesByfilter);
router.post('/game/update',updateGame);
router.post('/game/update/one',updateOneGame);
router.post('/game/update/speci',updteSpecificGames);
router.post('/game/delete',deleteGame);

// Jodi Routes
router.get('/jodi/get',fetchJodi);
router.get('/jodi/all/get',fetchAllJodis);
router.post('/jodi/create',createJodi);
router.post('/jodi/update',updateJodi);
router.post('/jodi/update/main',updateOuterJodi);
router.post('/jodi/delete',deleteJodi);
router.post('/jodi/delete/perm',deleteOuterJodi);

// Panel Routes
router.get('/panel/get',fetchPanel);
router.get('/panel/all/get',fetchAllPanel);
router.post('/panel/create',createPanel);
router.post('/panel/update',updatePanel);
router.post('/panel/update/main',updateOuterPanel);
router.post('/panel/delete',deletePanel);
router.post('/panel/delete/perm',deleteOuterPanel);

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
