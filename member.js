function skillMember() {
    var member = {
        name: "John",
        age: 30,
        sayName: function () {
            console.log(this.name);
        }
    };
    return member;
}