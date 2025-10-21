class contact{
    constructor (name, number){
        this.name = name;
        this.number = number;
    }
}
const newContact = new contact("Alice", "0509876543");
const newContact1 = new contact("shlomo", "0523456789");
const fajax1 = new fajax();
fajax1.open("POST")
fajax1.onload((res)=> {if(res)console.log("woohooo")
    else
        console.log("oh no")
})
fajax1.send(newContact)
fajax1.send(newContact1)


const fajax2 = new fajax();
fajax2.open("GET")
fajax2.onload((res)=> {console.log(res)
})
fajax2.send()
