function addListingtoRecentHistory(idx) {
    // Get Reference to User Viewing History
    const user = firebaseApp.auth().currentUser;
    const uid = getUID(user);
    const RecentHistoryRef = getUserHistoryRef(uid);

    // Get the Listing's Key Value in the Database
    let listingKey = listings[idx].ref.key;

    // Tries to find the Key
    let keyPromise = keyExists(RecentHistoryRef, listingKey);

    // If successful, do nothing
    // Else, push the listing key to the user's viewing history
    keyPromise.then((res) => {
    //  console.log(res);
    }).catch((rej) => {
    //  console.log(rej);
        RecentHistoryRef.push(listingKey);
    });

}

function saveListing(idx) {
    // Get Reference to User Saved Listings
    const user = firebaseApp.auth().currentUser;
    const uid = getUID(user);
    const SavedListingsRef = getUserSaveListingRef(uid);

    // Get the Listing's Key Value in the Database
    let listingKey = listings[idx].ref.key;

    // Tries to find the Key
    let keyPromise = keyExists(SavedListingsRef, listingKey);

    // If successful, do nothing
    // Else, push the listing key to the user's viewing history
    keyPromise.then((res) => {
    //  console.log(res);
    }).catch((rej) => {
    //  console.log(rej);
        SavedListingsRef.push(listingKey);
    });
}

function keyExists(userHistoryRef, listingKey) {
    return new Promise ((resolve, reject) => {
        userHistoryRef.once('value', function(snapshot) {
            snapshot.forEach((key) => {
                if (listingKey == key.val()) {
                    resolve("Found Key!");
                    return true;
                }
            });
            reject("Key Doesn't Exist");
        });
    });
}


// Testing Storing when Not Logged in
const getUID = (user) => {
    if (user) {
        return user.uid;
    } else {
        return false;
    }
};

const getUserHistoryRef = (uid) => {
    if (uid) {
        return firebaseApp.database().ref('users/' + uid + '/RecentHistory');
    }
};

const getUserSaveListingRef = (uid) => {
    if (uid) {
        return firebaseApp.database().ref('users/' + uid + '/SavedListings');
    }
};
