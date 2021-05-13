
let users = document.querySelector(".users")
let friendsUl = document.querySelector(".friends ul")
let suggestionUl = document.querySelector(".suggestion ul")

let friendsOfFriendsUl = document.querySelector(".friendsOfFriends ul")
let data2 = []
let data = []
const asyncFetch = async function () {
    let fetched = await fetch('./data.json');
    let data2 = await fetched.json();
    data.push(...data2);
    return [...data2];
}


async function asyncFunc() {
    data2 = await asyncFetch();

    //show lis
    let usersNames = data2.map(function (item) {
        return `<li id="${item.id}" >${item.firstName} ${item.surname}</li>`
    })
    users.innerHTML = usersNames.join(" ");
    //show lis
    let liS = document.querySelectorAll(".users li");
    let person;
    liS.forEach(function (item) {
        item.addEventListener("click", function () {
            // li style
            liS.forEach(function (item) {
                item.classList.remove("active")
            })
            this.classList.add("active")
            // li style
            //friends
            data2.forEach(function (item1) {
                if (item.id == item1.id) {
                    person = item1;
                };
            })
            // console.log(person)
            let friendsOfPerson = [];
            data2.forEach(function (item) {
                person.friends.forEach(function (item1) {
                    if (item.id == item1) {
                        friendsOfPerson.push(item);
                    }
                })
            })
            let friendsElements = friendsOfPerson.map(function (item) {
                return `<li id="${item.id}" >${item.firstName} ${item.surname}</li>`
            })
            friendsUl.innerHTML = friendsElements.join(" ");
            //friends
            //friends of friends
            let friendsOfFriends = [];
            friendsOfPerson.forEach(function (item) {
                // console.log(item)
                let name = `${item.firstName} ${item.surname}`;
                friendsOfFriends.push({ name, friends: [] })
                item.friends.forEach(function (item1) {
                    data2.forEach(function (item2) {
                        if (item1 == item2.id) {
                            friendsOfFriends.forEach(function (item3) {

                                if (item3.name == name) {
                                    item3.friends.push(item2)
                                }
                            })
                        }
                    })
                })

            })
            // console.log(friendsOfFriends)
            let friendsOfFriendsElement = "";
            friendsOfFriends.forEach(function (item) {
                // console.log(item)
                friendsOfFriendsElement += `<p>${item.name}:</p>`;
                item.friends.forEach(function (item1) {
                    // console.log(item1)
                    friendsOfFriendsElement += `<li class="${item1.id}">${item1.firstName} ${item1.surname}</li>`
                })
            })
            // console.log(friendsOfFriendsElement)
            friendsOfFriendsUl.innerHTML = friendsOfFriendsElement;
            // friendsoffriends
            // suggestions
            // console.log(friendsOfPerson)
            let notFriendsOfPerson = [];
            data2.forEach(function (item) {
                // console.log(person.friends)
                if (!person.friends.includes(item.id) && item.id != person.id) {
                    notFriendsOfPerson.push(item)
                }
            })
            // console.log(notFriendsOfPerson)
            // suggestions
            let suggested = [];
            notFriendsOfPerson.forEach(function (item) {
                // suggested.push({ [item.id]: [] })
                suggested.push({ id: item.id, friends: [] })
                item.friends.forEach(function (item1) {

                    if (person.friends.includes(item1)) {
                        suggested.forEach(function (item2) {
                            if (item2.id == item.id) {
                                // item2[item.id].push(item1)
                                item2.friends.push(item1)

                            }
                        })


                    }
                })
            })
            // console.log(suggested)
            let suggestedFriends = []
            suggested.forEach(function (item) {
                if (item.friends.length >= 2) {
                    data2.forEach(function (item1) {

                        if (item.friends.includes(item1.id)) {
                            suggestedFriends.push(item1)
                        }
                    })
                }
            })

            if (suggestedFriends.length >= 1) {
                let suggsArr = suggestedFriends.map(function (item) {

                    return `<li class="${item.id}">${item.firstName} ${item.surname}</li>`
                })
                // console.log(suggsArr)
                suggestionUl.innerHTML = suggsArr.join(" ")

            } else {
                suggestionUl.innerHTML = "No suggestions"
            }
        })

    })


}
asyncFunc();

