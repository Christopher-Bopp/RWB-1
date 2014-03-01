function loginEncrypt()
{

var lname=document.Login["user"].value;
lname=encryptDecrypt(lname);
document.Login["user"].value=lname;


var password=document.Login["password"].value;
password=encryptDecrypt(password);
document.Login["password"].value=password;
alert(document.Login["password"].value);
}
function encryptDecrypt(input)
{
var output="";
var key="1";
console.log(input.length);
for(i=0;i<input.length;i++)
{
console.log(input.charCodeAt(i));
console.log(key.charCodeAt(0));

j=input.charCodeAt(i)^key.charCodeAt(0);
console.log(j);
if(j>=0&&j<10)
 output+=j;
else
{
 var res = String.fromCharCode(j);
 output+=res;

}
}
console.log(output);
return output;
}
