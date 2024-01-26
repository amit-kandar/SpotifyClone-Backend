import Router from 'express';
import { checkAuth } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/permission.middleware';
import { upload } from '../middlewares/multer.middleware';
import { addTrackToPlaylist, createPlaylist, getPlaylists, getPlaylist, likePlaylist, removePlaylist, removeTrackFromPlaylist, updatePlaylist, likedPlaylists } from '../controllers/playlist.controller';
const router = Router();

// Create a new playlist
router.post("/", checkAuth, checkRole(["admin", "artist"]), upload.single("cover_image"), createPlaylist);

// Get all playlists
router.get("/", checkAuth, checkRole(["admin", "artist", "regular"]), getPlaylists);

// Get all liked playlists
router.get("/liked", checkAuth, checkRole(["admin", "artist", "regular"]), likedPlaylists);

// Get playlist by ID
router.get("/:id", checkAuth, checkRole(["admin", "artist", "regular"]), getPlaylist);

// Add track to an playlist
router.put("/:id/add-track", checkAuth, checkRole(["admin", "artist"]), addTrackToPlaylist);

// Remove track from an playlist
router.delete("/:id/remove-track", checkAuth, checkRole(["admin", "artist"]), removeTrackFromPlaylist);

// Remove an playlist
router.delete("/:id", checkAuth, checkRole(["admin", "artist"]), removePlaylist);

// Like an playlist
router.post("/:id/like", checkAuth, checkRole(["admin", "artist", "regular"]), likePlaylist);

// Update an playlist
router.put("/:id", checkAuth, checkRole(["admin", "artist"]), updatePlaylist);

export default router;