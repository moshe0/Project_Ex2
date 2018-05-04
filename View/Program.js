const UserType = require('./../Model/User');
const GroupType = require('./../Model/Group');
const NTreeType = require('./../Model/NTree');
const UsersType = require('./../Controller/Users');
const GroupsType = require('./../Controller/Groups');
const TreeType = require('./../Controller/Tree');
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
            console.log(tree.DisplayUsersInGroups());
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
            user.Name = tmp_name;
            users.UpdateUser(tmp_name, user);
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
    tmp_name = name;
    rl.question('Enter user password:' + "\n", processUserPassword);
}



function processAddGroup(name) {
    if(name === ''){
        rl.question('Enter group name:' + "\n", processAddGroup);
    }
    else
    {
        group.Name = name;
        group.Users = [];

        if(tree.isAnyNodeExist() === false) {
            console.log(tree.AddGroup(group, null));
            rl.question('Press any key to continue:' + "\n", processContinue);
        }
        else{
            rl.question('Enter group parent name:' + "\n", processAddGroupParentName);
        }
    }
}

function processAddGroupParentName(parentName) {
    if (parentName === '')
        rl.question('Enter group name:' + "\n", processAddGroupParentName);
    else {
        tmp_name = parentName;
        rl.question('Enter create group name: (in case the parent name have users)' + "\n", processAddGroupCreateNodeName);
    }
}

function processAddGroupCreateNodeName(createNodeName) {
    if (createNodeName === '')
        rl.question('Enter create group name: (in case the parent name have users)' + "\n", processAddGroupCreateNodeName);
    else {
        console.log(tree.AddGroup(group, tmp_name, createNodeName));
        rl.question('Press any key to continue:' + "\n", processContinue);
    }
}

function processDeleteGroup(name) {
    groups.DeleteGroup(name);
    rl.question('Press any key to continue:' + "\n", processContinue);
}



function processUserGroup_g(groupName) {
    tmp_group = groupName;
    rl.question('Enter user name:' + "\n", processUserGroup_u);
}

function processUserGroup_u(user) {
    if (actionTypeUserGroup === 1)
        console.log(tree.AddUserToGroup(user, tmp_group));
    else if (actionTypeUserGroup === 2)
        console.log(tree.RemoveUserFromGroup(user, tmp_group));
    rl.question('Press any key to continue:' + "\n", processContinue);
}






var tmp_group;
var tmp_name;
var actionTypeUserGroup;
var actionTypeUser;
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



user = new UserType();
group = new GroupType();
users = new UsersType();
tree = new TreeType(users.users);
groups = new GroupsType();
u2G = new U2G(users.users);


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