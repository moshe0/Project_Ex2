const UserType = require('./../Model/User');
const GroupType = require('./../Model/Group');
const UsersType = require('./../Controller/Users');
const GroupsType = require('./../Controller/Groups');
const U2G = require('./../Controller/U2G');


function processInput(answer) {
    switch (answer) {
        case '1':
            actionTypeUser = 1;
            rl.question('Enter user name:' + "\n", processUserName);
            break;
        case '2':
            rl.question('Enter user name:' + "\n", processDeleteUser);
            break;
        case '3':
            actionTypeUser = 2;
            rl.question('Enter user name that you want to update:' + "\n", processUpdateUser);
            break;
        case '4':
            users.DisplayUsers();
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
        case '5':
            rl.question('Enter group name:' + "\n", processAddGroup);
            break;
        case '6':
            rl.question('Enter group name:' + "\n", processDeleteGroup);
            break;
        case '7':
            groups.DisplayGroups();
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
        case '8':
            actionTypeUserGroup = 1;
            rl.question('Enter group name:' + "\n", processUserGroup_g);
            break;
        case '9':
            actionTypeUserGroup = 2;
            rl.question('Enter group name:' + "\n", processUserGroup_g);
            break;
        case '10':
            u2G.DisplayUsersInGroups();
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
        case '11':
            rl.close();
            process.exit();
            break;
        default:
            console.log(' You dont enter right chooce please try again!!!');
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
    }
}

function processContinue(answer) {
    Main();
}

function processUserName(name) {
    user.Name = name;
    rl.question('Enter user password:' + "\n", processUserPassword);
}

function processUserPassword(password) {
    user.Password = password;
    rl.question('Enter user age:' + "\n", processUserAge);
}

function processUserAge(age) {
    if(isNaN(age) == false) {
        user.Age = age;
        if(actionTypeUser === 1) {
            users.AddUser(user);
        }
        else if(actionTypeUser === 2){
            user.Name = tmp_userName;
            users.UpdateUser(tmp_userName, user);
        }
        rl.question('Press any key to continue:' + "\n", processContinue);
    }
    else
        rl.question('Enter user age:' + "\n", processUserAge);
}

function processDeleteUser(name) {
    u2G.RemoveUserFromGroups(name);
    users.DeleteUser(name);
    rl.question('Press any key to continue:' + "\n", processContinue);
}


function processUpdateUser(name) {
    tmp_userName = name;
    rl.question('Enter user password:' + "\n", processUserPassword);
}



function processAddGroup(name) {
    group.Name = name;
    group.Users = [];
    groups.AddGroup(group);
    rl.question('Press any key to continue:' + "\n", processContinue);
}

function processDeleteGroup(name) {
    groups.DeleteGroup(name);
    rl.question('Press any key to continue:' + "\n", processContinue);
}



function processUserGroup_g(group) {
    tmp_group = group;
    rl.question('Enter user name:' + "\n", processUserGroup_u);
}

function processUserGroup_u(user) {
    if(actionTypeUserGroup === 1)
        console.log(u2G.AddUserToGroup(tmp_group, user));
    else if(actionTypeUserGroup === 2)
        console.log(u2G.RemoveUserFromGroup(tmp_group, user));
    rl.question('Press any key to continue:' + "\n", processContinue);
}





user = new UserType();
group = new GroupType();
users = new UsersType();
groups = new GroupsType();
u2G = new U2G(users.users, groups.groups);


var tmp_group;
var tmp_userName;
var actionTypeUserGroup;
var actionTypeUser;
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


(function init() {
    console.log("Welcome to SqlLabs chat!!!");
    Main();
})();

function Main(){
    rl.question(
        "Please chooce a number option:" + "\n" +
        "Users:" + "\n" +
        "   1. Add a user." + "\n" +
        "   2. Remove a user." + "\n" +
        "   3. Update a user." + "\n" +
        "   4. Display a List of users." + "\n" +
        "Groups:" + "\n" +
        "   5. Add a Group." + "\n" +
        "   6. Remove a Group." + "\n" +
        "   7. Display a List of groups" + "\n" +
        "Users to Groups association:" + "\n" +
        "   8. Add user to group." + "\n" +
        "   9. Remove user from group." + "\n" +
        "  10. Display a List of users in groups" + "\n" +
        "11. Exit." + "\n", processInput);
}