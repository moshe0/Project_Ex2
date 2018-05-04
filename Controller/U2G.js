const UsersType = require('./../Controller/Users');
const GroupsType = require('./../Controller/Groups');
const NTreeType = require('./../Model/NTree');



function U2G(u) {
    this.users = u;
    this.nTree = null;
}

U2G.prototype= {
        AddUserToGroup:
        function AddUserToGroup(groupName, userName) {
            var resStr = '';
            var resGroupIndex = GroupsType.prototype.GroupIndexOf(this.nTree, groupName);
            if (resGroupIndex === -1) {
                resStr = 'The group: ' + groupName + ' is not exists!!!';
                return resStr;
            }

            var resUser = UsersType.prototype.UserIndexOf(this.users, userName);
            var resGroup = UsersType.prototype.UserIndexOf(this.nTree[resGroupIndex].Users, userName);


            if (resUser > -1) {
                if (resGroup === -1) {
                    this.nTree[resGroupIndex].Users.push(this.users[resUser]);
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
            var resGroupIndex = GroupsType.prototype.GroupIndexOf(this.nTree, groupName);
            if (resGroupIndex === -1) {
                resStr = 'The group: ' + groupName + ' is not exists!!!';
                return resStr;
            }

            var resUser = UsersType.prototype.UserIndexOf(this.users, userName);
            var resGroup = UsersType.prototype.UserIndexOf(this.nTree[resGroupIndex].Users, userName);


            if (resUser > -1) {
                if (resGroup > -1) {
                    this.nTree[resGroupIndex].Users.splice(resGroup, 1);
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
            for(var i=0 ; i<this.nTree.length ; i++){
                this.RemoveUserFromGroup(this.nTree[i].Name, userName);
            }
        },

        DisplayUsersInGroups:
        function DisplayUsersInGroups() {
            var str = '';
            for(var i=0 ; i<this.nTree.length ; i++){
                str += this.nTree[i].Name + '\n';
                for(var j=0 ; j<this.nTree[i].Users.length ; j++){
                        str += this.nTree[i].Users[j].Name + '(' + this.nTree[i].Users[j].Age + ')' + '\n';
                }
            }
            console.log(str);
        }
}

module.exports = U2G;