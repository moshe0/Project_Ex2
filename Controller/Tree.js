const GroupType = require('./../Model/Group');
const UsersType = require('./../Controller/Users');
const NTreeType = require('./../Model/NTree');

function Tree(users){
    this.users = users;
    this.Node = null;

    this.AddUserToGroup = function AddUserToGroup(user, groupName){
        var strRes = '';
        var node = this.SearchGroup(this.Node, groupName);
        var userRes = UsersType.prototype.UserIndexOf(this.users, user);
        if(!node)
            strRes = 'Group: ' + groupName + ' not exist!!!';
        else if(node.children.length > 0)
            strRes = 'Group: ' + groupName + ' containing groups!!!';
        else if(userRes === -1)
            strRes = 'The user: ' + user + ' is not exists!!!';
        else if(UsersType.prototype.UserIndexOf(node.data.Users, user) > -1)
            strRes = 'The user: ' + user + ' already in: ' + groupName + ' !!!';
        else{
            node.data.Users.push(Object.assign({}, this.users[userRes]));
            node.count++;
            while (!!node.parent){
                node = node.parent;
                node.count++;
            }
            strRes = 'User: ' + user + ' added to: ' + groupName + ' !!!';
        }
        return strRes;
    };

    this.RemoveUserFromGroup = function RemoveUserFromGroup(userName, groupName){
        var strRes = '';
        var node = this.SearchGroup(this.Node, groupName);

        if(!node)
            strRes = 'Group: ' + groupName + ' not exist!!!';
        else{
            for(var i=0 ; i<node.data.Users.length ; i++){
                if(node.data.Users[i].Name === userName){
                    node.data.Users.splice(i, 1);
                    node.count--;
                    while (!!node.parent){
                        node = node.parent;
                        node.count--;
                    }
                    return 'User: ' + userName + ' removed from: ' + groupName + ' !!!';
                }
            }
            strRes = 'User: ' + userName + ' not exist in ' + groupName + ' !!!';
        }
        return strRes;
    };

    this._RemoveUserFromGroups = function _RemoveUserFromGroups(node, userName) {
        if(node.data.Users.length > 0)
            this.RemoveUserFromGroup(userName, node.data.Name);

        for(var i=0 ; i<node.children.length ; i++){
            this._RemoveUserFromGroups(node.children[i], userName);
        }
    }

    this.RemoveUserFromGroups = function RemoveUserFromGroups(userName) {
        this._RemoveUserFromGroups(this.Node, userName);
    }

    this.AddGroup = function AddGroup(group, groupParentName, createNodeName){
        var strRes = '';
        if(this.isAnyNodeExist() === false){
            this.Node = CreateNewNode(null, group);
            strRes = 'Group: ' + group.Name + ' added!!!';
        }
        else if(groupParentName === '')
            strRes = 'Group parent: ' + groupParentName + ' not exist!!!';
        else if(!!this.SearchGroup(this.Node, group.Name))
            strRes = 'The group: ' + group.Name + ' already exist!!!';
        else if(!!this.SearchGroup(this.Node, createNodeName))
            strRes = 'The group: ' + createNodeName + ' already exist!!!';
        else if(createNodeName === group.Name)
            strRes = 'The group name must be different from create node name!!!';
        else{
            var node = this.SearchGroup(this.Node, groupParentName);
            if(!node) {
                strRes = 'Parent group: ' + groupParentName + ' not exist!!!';
            }
            else{
                node.children.push(CreateNewNode(node, group));
                strRes = 'Group: ' + group.Name + ' added to ' + node.data.Name + '!!!';
                if(node.data.Users.length > 0) {
                    var tmpGroup = new GroupType();
                    tmpGroup.Name = createNodeName;
                    tmpGroup.Users = Object.assign({}, node.data.Users);
                    node.data.Users = [];
                    node.children.push(CreateNewNode(node, tmpGroup));
                    strRes += '\n' + 'Group: ' + createNodeName + ' added to ' + node.data.Name + '!!!';
                }
            }
        }
        return strRes;
    };

    this.RemoveGroup = function RemoveGroup(groupName){
        var strRes = '';
        var node = this.SearchGroup(this.Node, groupName);
        if(!node) {
            strRes = 'Group: ' + groupName + ' not exist!!!';
        }
        else{
            var parentNode = node.parent;
            var userCountDecrease = node.data.Users.length;
            parentNode.count -= userCountDecrease;

            for(var i=0 ; i<parentNode.children.length ; i++){
                if(parentNode.children[i].data.Name === groupName){
                    parentNode.children.splice(i, 1);
                    for(var j=0 ; j<node.children.length ; j++) {
                        node.children[j].parent = parentNode;
                        parentNode.children.splice(i++, 0, node.children[j]);
                    }
                    break;
                }
            }

            while (!!parentNode.parent){
                parentNode = parentNode.parent;
                parentNode.count -= userCountDecrease;
            }
            strRes = 'Group: ' + groupName + ' deleted!!!';
        }
        return strRes;
    };

    //Search group in tree and return the node if it's exist and null if not exist
    this.SearchGroup = function SearchGroup(node, groupName){
        if(!node.data)
            return null;
        else if(node.data.Name === groupName)
            return node;
        else {
            var nodeTmp;
            for(var i=0 ; i<node.children.length ; i++){
                nodeTmp = SearchGroup(node.children[i], groupName);
                if(!!nodeTmp)
                    return nodeTmp;
            }
            return null;
        }
    };

    this.Flattening = function Flattening(groupName){
        var strRes = '';
        var node = this.SearchGroup(this.Node, groupName);

        if(!node)
            strRes = 'Group: ' + groupName + ' not exist!!!';
        else{
            if(node.data.Users.length === 0 || node.parent === null || node.parent.children > 1)
                this.RemoveGroup(node.data.Name);
            else{
                node.parent.data.Users = node.data.Users;
                this.RemoveGroup(node.data.Name);
            }
            strRes = 'Group: ' + groupName + ' flatted!!!';
        }
        return strRes;
    };

    //Display path in tree for specific group
    this._DisplayGroupPath = function _DisplayGroupPath(node, groupName, strRes){
        if(node.data.Name === groupName)
            return groupName;
        else {
            strRes += node.data.Name + '->';
            for(var i=0 ; i<node.children.length ; i++){
                var tmpStr = this._DisplayGroupPath(node.children[i], groupName, '');
                if(tmpStr.endsWith(groupName) === true) {
                    strRes += tmpStr;
                    return strRes;
                }
            }
        }
        return 'the group not exist!!!';
    };

    this.DisplayGroupPath = function DisplayGroupPath(groupName){
        if(this.isAnyNodeExist() === true)
            return this._DisplayGroupPath(this.Node, groupName, '');
        else
            return '';
    };


    // Display all groups
    this._DisplayGroups = function _DisplayGroups(node, strRes, indentation){
        if(node.parent === null)
            strRes += node.data.Name + '\n';
        indentation += '---';
        for(var i=0 ; i<node.children.length ; i++){
            strRes += indentation + node.children[i].data.Name + '\n';
            strRes += this._DisplayGroups(node.children[i], '', indentation);
        }
        return strRes;
    };

    this.DisplayGroups = function DisplayGroups(){
        if(this.isAnyNodeExist() === true)
            return this._DisplayGroups(this.Node, '', '---');
        else
            return '';
    };


    // Display all groups associated to user
    this._DisplayUserInGroups = function _DisplayUserInGroups(node, userName, strRes){
        if(node.parent === null && UsersType.prototype.UserIndexOf(node.data.Users, userName) > -1)
            strRes += node.data.Name + ', ';
        for (var i = 0; i < node.children.length; i++) {
            if (UsersType.prototype.UserIndexOf(node.children[i].data.Users, userName) > -1)
                strRes += node.children[i].data.Name + ', ';
            strRes += this._DisplayUserInGroups(node.children[i], userName, '');
        }

        return strRes;
    };

    this.DisplayUserInGroups = function DisplayUserInGroups(userName){
        if(this.isAnyNodeExist() === true)
            return this._DisplayUserInGroups(this.Node, userName, '').replace(/,([^,]*)$/,'$1').trim();
        else
            return '';
    };


    //Display full tree
    this._DisplayUsersInGroups = function _DisplayUsersInGroups(node, strRes, indentation){
        if(node.parent === null)
            strRes += node.data.Name + '(' + node.count + ')' + '\n';
        indentation += '   ';
        for(var i=0 ; i<node.data.Users.length ; i++) {
            strRes += indentation + node.data.Users[i].Name + '(' + node.data.Users[i].Age + ')' + '\n';
        }
        for(var i=0 ; i<node.children.length ; i++) {
            strRes += indentation + node.children[i].data.Name + '(' + node.children[i].count + ')' + '\n';
            strRes += this._DisplayUsersInGroups(node.children[i], '', indentation);
        }
        return strRes;
    };

    this.DisplayUsersInGroups = function DisplayUsersInGroups() {
        if(this.isAnyNodeExist() === true)
            return this._DisplayUsersInGroups(this.Node, '', '');
        else
            return '';
    };

    function CreateNewNode(node, group){
        var newNode = new NTreeType(Object.assign({}, group), node, [], 0);
        return newNode;
    }

    this.isAnyNodeExist = function isAnyNodeExist(){
        if(!this.Node)
            return false;
        return true;
    }
}


module.exports = Tree;