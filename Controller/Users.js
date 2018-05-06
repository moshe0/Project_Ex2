function Users() {
    this.users = [];
}

Users.prototype={

    AddUser:
    function AddUser(user){
        if(this.UserIndexOf(this.users, user.Name) === -1) {
            this.users.push(Object.assign({}, user));
            console.log('user: ' + user.Name + ' added!!!');
        }
        else
            console.log('The user is already exists!!!');
    },

    RemoveUser:
    function RemoveUser(userName){
        var res = this.UserIndexOf(this.users, userName);
        if(res > -1) {
            this.users.splice(res, 1);
            console.log('user: ' + userName + ' deleted!!!');
        }
        else
            console.log('The user not exists!!!');
    },

    UpdateUser:
    function UpdateUser(userNameTarget, user){
        var res = this.UserIndexOf(this.users, userNameTarget);
        if(res > -1) {
            this.users[res].Password = user.Password;
            this.users[res].Age = user.Age;
            console.log('user updated!!!');
        }
        else
            console.log('The user that you what to update not exists!!!');
    },

    DisplayUsers:
    function DisplayUsers(){
        for(var i=0 ; i<this.users.length ; i++) {
            console.log(this.users[i]);
        }
    },

    UserIndexOf:
    function UserIndexOf(userArray ,userName){
        for(var i=0 ; i<userArray.length ; i++){
            if(userArray[i].Name === userName){
                return i;
            }
        }
        return -1;
    }
};

module.exports = Users;