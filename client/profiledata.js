    // profileData.js
    let profiles = [];
    let currentId = 1;

    export function addProfile(profile) {
    const newProfile = { id: currentId++, ...profile };
    profiles.push(newProfile);
    console.log("Profile added:", newProfile);
    }

    export function findUserById(id) {
    return profiles.find(profile => profile.id === id);
    }

    export function findUserByUsernameAndPassword(username, password) {
    return profiles.find(p => p.username === username && p.password === password);
    }

    export function getProfiles() {
    return profiles;
    }
