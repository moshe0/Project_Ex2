const UsersType = require('./../Controller/Users');
const GroupsType = require('./../Controller/Groups');


function U2G(u, g) {
    this.users = u;
    this.groups = g;
}

U2G.prototype= {
        AddUserToGroup:
        function AddUserToGroup(groupName, userName) {
            var resStr = '';
            var resGroupIndex = GroupsType.prototype.GroupIndexOf(this.groups, groupName);
            if (resGroupIndex === -1) {
                resStr = 'The group: ' + groupName + ' is not exists!!!';
                return resStr;
            }

            var resUser = UsersType.prototype.UserIndexOf(this.users, userName);
            var resGroup = UsersType.prototype.UserIndexOf(this.groups[resGroupIndex].Users, userName);


            if (resUser > -1) {
                if (resGroup === -1) {
                    this.groups[resGroupIndex].Users.push(this.users[resUser]);
                    resStr = 'The user: ' + userName + ' has added to group: ' + groupName + '!!!';
                }
                else
                    resStr = 'The user: ' + userName + ' has already exists!!!';
            }
            else {
                resStr = 'The user: ' + userName + ' is not exists!!!';
            }
            return resStr;
        },

        RemoveUserFromGroup:
        function RemoveUserFromGroup(groupName, userName) {
            var resStr = '';
            var resGroupIndex = GroupsType.prototype.GroupIndexOf(this.groups, groupName);
            if (resGroupIndex === -1) {
                resStr = 'The group: ' + groupName + ' is not exists!!!';
                return resStr;
            }

            var resUser = UsersType.prototype.UserIndexOf(this.users, userName);
            var resGroup = UsersType.prototype.UserIndexOf(this.groups[resGroupIndex].Users, userName);


            if (resUser > -1) {
                if (resGroup > -1) {
                    this.groups[resGroupIndex].Users.splice(resGroup, 1);
                    resStr = 'The user: ' + userName + ' has deleted from group: ' + groupName + '!!!';
                }
                else
                    resStr = 'The user: ' + userName + ' has already not exists!!!';
            }
            else {
                resStr = 'The user: ' + userName + ' is not exists!!!';
            }
            return resStr;
        },

        RemoveUserFromGroups:
        function RemoveUserFromGroups(userName){
            for(var i=0 ; i<this.groups.length ; i++){
                this.RemoveUserFromGroup(this.groups[i].Name, userName);
            }
        },

        DisplayUsersInGroups:
        function DisplayUsersInGroups() {
            var str = '';
            for(var i=0 ; i<this.groups.length ; i++){
                str += this.groups[i].Name + '\n';
                for(var j=0 ; j<this.groups[i].Users.length ; j++){
                        str += this.groups[i].Users[j].Name + '(' + this.groups[i].Users[j].Age + ')' + '\n';
                }
            }
            console.log(str);
        }
}

module.exports = U2G;