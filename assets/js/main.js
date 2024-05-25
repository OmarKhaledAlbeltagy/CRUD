var siteNameInput = document.getElementById('siteNameInput');
var siteUrlInput = document.getElementById('siteUrlInput');
var tableBody = document.getElementById('tableBody');

var urlRegex = /^(http:\/\/|https:\/\/){0,1}[(a-z){1,20}.]{0,1}[a-z]{2,}[.]{1}[a-z]{2,5}/ig;

/*this regex pattern (httpRegex) check if the url start with "http://" or "https://"
if the url not start with any of them, "https://" will be added to the url on urlValidation() function*/
var httpRegex = /^(http:\/\/|https:\/\/){1}/ig;
var arr = [];



if (localStorage.getItem('data') != null) {
    arr = JSON.parse( localStorage.getItem('data') );
}


function addBookmark() {
    var siteName = siteNameInput.value;
    var siteUrl = siteUrlInput.value;

    var validationResult = urlValidation(siteUrl);

    if (validationResult == false) {
        siteUrlInput.classList.add('is-invalid')
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Website URL is not valid!"
        });
    }
    else {
        siteUrlInput.classList.remove('is-invalid')
        var bookmarkObj = { "websiteName": siteName, "WebsiteUrl": validationResult }

        arr.push(bookmarkObj);

        updatestorage();

        display();

        clearFields();
    }

}

function updatestorage(){
localStorage.setItem('data',JSON.stringify(arr));
}

function urlValidation(url){

if (urlRegex.test(url)) {

    if (httpRegex.test(url)) {
        return url;
    }
    else{
        return "https://"+url;
    }
    
}
else{
    return false;
}

}


function deleteBookmark(ind){

    Swal.fire({
        title: "Are you sure to delete bookmark?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            arr.splice(ind, 1);
            updatestorage();
            display();
            Swal.fire({
                title: "Deleted!",
                text: "Your bookmark has been deleted.",
                icon: "success"
            });
        }
    });

}


function display(){
    var content = "";

    for (var i = 0; i < arr.length; i++) {
        content += `<tr>
                    <td>`+i+`</td>
                    <td>`+arr[i].websiteName+`</td>
                    <td><a href="`+arr[i].WebsiteUrl+`" target="_blank" class="text-white fw-fw-bolder fs-6 ">`+arr[i].WebsiteUrl+`</a></td>
                    <td><a  href=`+arr[i].WebsiteUrl+` target="_blank" class="btn btn-primary">Visit</a></td>
                    <td><button onClick="deleteBookmark(`+i+`)" class="btn btn-danger">Delete</button></td>
                    </tr>`
    }

    tableBody.innerHTML = content;
}

function clearFields(){
    siteNameInput.value = "";
    siteUrlInput.value = "";
}




display();
