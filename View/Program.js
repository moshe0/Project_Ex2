const UserType = require('./../Model/User');
const GroupType = require('./../Model/Group');
const UsersType = require('./../Controller/Users');
const TreeType = require('./../Controller/Tree');


function processInput(answer) {
    switch (answer) {
        case '1':
            actionTypeUser = 1;
            rl.question('Enter user name:' + "\n", processUserName);
            break;
        case '2':
            rl.question('Enter user name:' + "\n", processRemoveUser);
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
            rl.question('Enter group name:' + "\n", processRemoveGroup);
            break;
        case '7':
            rl.question('Enter group name:' + "\n", processFlatteningGroup);
            break;
        case '8':
            console.log(tree.DisplayGroups());
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
        case '9':
            rl.question('Enter group name:' + "\n", processGroupPath);
            break;
        case '10':
            actionTypeUserGroup = 1;
            rl.question('Enter group name:' + "\n", processUserGroup_g);
            break;
        case '11':
            actionTypeUserGroup = 2;
            rl.question('Enter group name:' + "\n", processUserGroup_g);
            break;
        case '12':
            console.log(tree.DisplayUsersInGroups());
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
        case '13':
            rl.question('Enter user name:' + "\n", processDisplayUserInGroups);
            break;
        case '14':
            rl.close();
            process.exit();
            break;
        default:
            console.log('You don\'t enter right choose please try again!!!');
            rl.question('Press any key to continue:' + "\n", processContinue);
            break;
    }
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

function processRemoveUser(name) {
    tree.RemoveUserFromGroups(name);
    users.RemoveUser(name);
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

function processRemoveGroup(groupName) {
    if (groupName === '')
        rl.question('Enter group name:' + "\n", processRemoveGroup);
    else {
        console.log(tree.RemoveGroup(groupName));
        rl.question('Press any key to continue:' + "\n", processContinue);
    }
}

function processGroupPath(groupName) {
    if (groupName === '')
        rl.question('Enter group name:' + "\n", processGroupPath);
    else {
        console.log(tree.DisplayGroupPath(groupName));
        rl.question('Press any key to continue:' + "\n", processContinue);
    }
}

function processFlatteningGroup(groupName) {
    if (groupName === '')
        rl.question('Enter group name:' + "\n", processFlatteningGroup);
    else {
        console.log(tree.Flattening(groupName));
        rl.question('Press any key to continue:' + "\n", processContinue);
    }
}

function processUserGroup_g(groupName) {
    tmp_group = groupName;
    rl.question('Enter user name:' + "\n", processUserGroup_u);
}

function processUserGroup_u(userName) {
    if (actionTypeUserGroup === 1)
        console.log(tree.AddUserToGroup(userName, tmp_group));
    else if (actionTypeUserGroup === 2)
        console.log(tree.RemoveUserFromGroup(userName, tmp_group));
    rl.question('Press any key to continue:' + "\n", processContinue);
}

function processDisplayUserInGroups(userName) {
    console.log(tree.DisplayUserInGroups(userName));
    rl.question('Press any key to continue:' + "\n", processContinue);
}

function processContinue(answer) {
    Main();
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


(function init() {
    //********** TEST **********************************
    user.Name = 'qq';
    user.Age = 11;
    user.Password = 11;
    users.AddUser(user);
    group.Name = 'aa';
    group.Users = [];
    tree.AddGroup(group, null);
    group.Name = 'zz';
    group.Users = [];
    tree.AddGroup(group, 'aa', 'zzzzzzzz');
    group.Name = 'ss';
    group.Users = [];
    tree.AddGroup(group, 'aa', 'zzzzzzzz');
    group.Name = 'jj';
    group.Users = [];
    tree.AddGroup(group, 'aa', 'zzzzzzzz');
    group.Name = 'dd';
    group.Users = [];
    tree.AddGroup(group, 'ss', 'zzzzzzzz');
    group.Name = 'ff';
    group.Users = [];
    tree.AddGroup(group, 'ss', 'zzzzzzzz');
    tree.AddUserToGroup('qq', 'jj');
    tree.AddUserToGroup('qq', 'ff');

    //***********************************************************

    console.log("Welcome to SqlLabs chat!!!");
    Main();
})();

function Main(){
    rl.question(
        "Please choose a number option:" + "\n" +
        "Users:" + "\n" +
        "   1. Add a user." + "\n" +
        "   2. Remove a user." + "\n" +
        "   3. Update a user." + "\n" +
        "   4. Display a List of users." + "\n" +
        "Groups:" + "\n" +
        "   5. Add a Group." + "\n" +
        "   6. Remove a Group." + "\n" +
        "   7. Flattening a Group." + "\n" +
        "   8. Display a List of groups." + "\n" +
        "   9. Display a path of group in tree." + "\n" +
        "Users to Groups association:" + "\n" +
        "  10. Add user to group." + "\n" +
        "  11. Remove user from group." + "\n" +
        "  12. Display a List of users in groups." + "\n" +
        "  13. Display a List of groups associated to user." + "\n" +

        "14. Exit." + "\n", processInput);
}