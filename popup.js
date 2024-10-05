
function getAuthenticatedUserId() {
    return fetch('https://users.roblox.com/v1/users/authenticated', {
        method: 'GET',
        credentials: 'include' 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok while fetching user ID');
        }
        return response.json();
    })
    .then(data => {
        return data.id; 
    })
    .catch(error => {
        console.error('Error fetching authenticated user ID:', error);
    });
}


function loadOutfits(userId) {
    const url = `https://avatar.roblox.com/v2/avatar/users/${userId}/outfits?page=1&itemsPerPage=25`;
    const dropdown = document.getElementById('outfitDropdown');
    dropdown.innerHTML = ''; 
    const messageElement = document.getElementById('message');
    messageElement.textContent = ''; 

    console.log(`Fetching outfits from: ${url}`);

    fetch(url)
        .then(response => {
            console.log('Response Status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok while fetching outfits');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched Data:', data);
            const outfits = data.data;
            if (outfits && outfits.length > 0) {
                outfits.forEach(outfit => {
                    const option = document.createElement('option');
                    option.value = outfit.id; 
                    option.textContent = outfit.name; 
                    dropdown.appendChild(option);
                });
            } else {
                const option = document.createElement('option');
                option.textContent = 'No outfits found.';
                dropdown.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Error fetching outfits:', error);
            messageElement.textContent = 'Error loading outfits. Please try again.';
        });
}
function getAuthenticatedUserId() {
    return fetch('https://users.roblox.com/v1/users/authenticated', {
        method: 'GET',
        credentials: 'include' 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok while fetching user ID');
        }
        return response.json();
    })
    .then(data => {
        return data.id; 
    })
    .catch(error => {
        console.error('Error fetching authenticated user ID:', error);
    });
}

function loadOutfits(userId) {
    const url = `https://avatar.roblox.com/v2/avatar/users/${userId}/outfits?page=1&itemsPerPage=25`;
    const dropdown = document.getElementById('outfitDropdown');
    dropdown.innerHTML = ''; 
    const messageElement = document.getElementById('message');
    messageElement.textContent = ''; 

    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select an outfit';
    defaultOption.value = ''; // Default value
    dropdown.appendChild(defaultOption);

    console.log(`Fetching outfits from: ${url}`);

    fetch(url)
        .then(response => {
            console.log('Response Status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok while fetching outfits');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched Data:', data);
            const outfits = data.data;
            if (outfits && outfits.length > 0) {
                outfits.forEach(outfit => {
                    const option = document.createElement('option');
                    option.value = outfit.id; 
                    option.textContent = outfit.name; 
                    dropdown.appendChild(option);
                });
            } else {
                const option = document.createElement('option');
                option.textContent = 'No outfits found.';
                dropdown.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Error fetching outfits:', error);
            messageElement.textContent = 'Error loading outfits. Please try again.';
        });
}

function getOutfitDetails(outfitId) {
    const url = `https://avatar.roblox.com/v1/outfits/${outfitId}/details`;
    const copyButton = document.getElementById('copyJsonButton');
    const messageElement = document.getElementById('message');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok while fetching outfit details');
            }
            return response.json();
        })
        .then(data => {
            const assets = data.assets || [];
            let updatedAssets = assets.map(asset => {
                const isFaceAccessory = asset.assetType.name === "FaceAccessory";
                const isHat = asset.assetType.name === "Hat";

                if ((isFaceAccessory || isHat) && !asset.meta) {
                    asset.meta = {
                        order: 0,
                        puffiness: 0,
                        position: { X: 0, Y: 0, Z: 0 },
                        rotation: { X: 0, Y: 0, Z: 0 },
                        scale: { X: 1.2, Y: 1.2, Z: 1.2 },
                        version: 1
                    };
                }

                return asset; 
            });

            const updatedData = {
                name: data.name || "Updated Outfit",
                bodyColor3s: {
                    headColor3: data.bodyColors.headColorId,
                    torsoColor3: data.bodyColors.torsoColorId,
                    rightArmColor3: data.bodyColors.rightArmColorId,
                    leftArmColor3: data.bodyColors.leftArmColorId,
                    rightLegColor3: data.bodyColors.rightLegColorId,
                    leftLegColor3: data.bodyColors.leftLegColorId
                },
                assets: updatedAssets,
                scale: {
                    height: data.scale.height,
                    width: data.scale.width,
                    head: data.scale.head,
                    depth: data.scale.depth,
                    proportion: data.scale.proportion,
                    bodyType: data.scale.bodyType
                },
                playerAvatarType: data.playerAvatarType || "R6",
                outfitType: 0
            };

            copyButton.onclick = () => {
                navigator.clipboard.writeText(JSON.stringify(updatedData, null, 2))
                    .then(() => {
                        messageElement.textContent = 'JSON data copied to clipboard!';
                    })
                    .catch(err => {
                        console.error('Error copying JSON data:', err);
                        messageElement.textContent = 'Failed to copy JSON data.';
                    });
            };
        })
        .catch(error => {
            console.error('Error:', error);
            messageElement.textContent = 'Error loading outfit details. Please try again.';
        });
}

document.addEventListener('DOMContentLoaded', function() {
    getAuthenticatedUserId().then(userId => {
        if (userId) {
            loadOutfits(userId); 
        } else {
            const messageElement = document.getElementById('message');
            messageElement.textContent = 'Could not retrieve user ID.';
        }
    });
});

document.getElementById('outfitDropdown').addEventListener('change', function(event) {
    const selectedOutfitId = event.target.value;
    if (selectedOutfitId) {
        getOutfitDetails(selectedOutfitId);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    getAuthenticatedUserId().then(userId => {
        if (userId) {
            loadOutfits(userId); 
        } else {
            const messageElement = document.getElementById('message');
            messageElement.textContent = 'Could not retrieve user ID.';
        }
    });
});


document.getElementById('outfitDropdown').addEventListener('change', function(event) {
    const selectedOutfitId = event.target.value;
    if (selectedOutfitId) {
        getOutfitDetails(selectedOutfitId);
    }
});
