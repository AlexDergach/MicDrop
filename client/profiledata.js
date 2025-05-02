// profileData.js

let profiles = [
  {
    id: 0,
    username: "busker",
    password: "1234",
    profileType: "busker",
    profileIcon: "https://i.pravatar.cc/100?u=busker1",
  },
  {
    id: 1,
    username: "bar",
    password: "5678",
    profileType: "bar",
    profileIcon: "https://i.pravatar.cc/100?u=venue1",
  },
];

let currentId = 2;
let activeProfile = null;

// ✅ Add a new user (from registration)
export function addProfile(profile) {
  const newProfile = { id: currentId++, ...profile };
  profiles.push(newProfile);
  console.log("Profile added:", newProfile);
}

// ✅ Look up a user by their ID
export function findUserById(id) {
  return profiles.find((p) => p.id === id);
}

// ✅ Login using username and password
export function findUserByUsernameAndPassword(username, password) {
  return profiles.find((p) => p.username === username && p.password === password);
}

// ✅ Return all registered users
export function getProfiles() {
  return profiles;
}

// ✅ Set a user as the currently active user
export function loginMockProfile(profile) {
  activeProfile = profile;
}

// ✅ Get the currently active user
export function getActiveProfile() {
  return activeProfile;
}
