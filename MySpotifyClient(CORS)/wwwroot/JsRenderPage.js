
$(document).ready(function () {
    CreateBodyGenre();

    $('#HomeBtn').on('click', function (e) {
        e.preventDefault();
        alert('Домашняя страница отсутсвует , в данной версии Вы управляете только админресурсом.')
    });

    function CreateBodyGenre() {
        $.ajax({
            url: 'https://localhost:7289/api/Genre',
            type: 'GET',
            contentType: false,
            processData: false,
            success: function (response) {

                let rows = "<ul class='adminGenreContentUl'>";
                $.each(response, function (index, genre) {
                    rows += rowMsg(genre);
                });
                rows += "</ul><button class='btnCreate bubbly-button' asp-route-id='1' asp-action='Create' data-dialog-title='Создание'><span class='text'>Создать</span></button>";
                $(".adminContent").html(rows);
                ButtonsEvents();
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);

            }
        });
        
    }


    function rowMsg(genre) {

        let rows = "<li>" +
            "<div style='border:2px solid red; border-radius:10px; width:180px;'>" +
            "<span>" + genre.name + "</span>" +
            "</div>" +
            "<button class='bubbly-button btnEdit' data-dialog-title='Редактирование' data-genreid='" + genre.id + "'>" +
            "<span class='text'>Изменить</span>" + "</button>" +
            "<button asp-action='Delete' asp-route-id='" + genre.id + "' class='bubbly-button btnDelete' data-dialog-title='Удаление' data-genreid='" + genre.id + "'>" +
            "<span class='text'>Удалить</span>" + "</button>";
        return rows;
    }


    function ButtonsEvents() {
        $(".btnEdit").on("click", async function (e) {
            e.preventDefault();

            let datas = await $.ajax({
                url: "https://localhost:7289/api/Genre/" + $(this).data("genreid"),
                method: 'GET',
                contentType: "application/json",
                success: function (obj) {
                    return (obj);
                },
                error: function (obj) {
                    alert('err');
                    return null;
                }

            });

            $("<div id='dialogcontent'><input type='text' id='ingen'/></div>")
                .addClass('dialog')
                .appendTo('body')
                .dialog({
                    contentType: false,
                    processData: false,
                    title: $(this).attr("data-dialog-title"),
                    close: function () { $('#dialogcontent').remove() },
                    modal: true,
                    buttons: {
                        'сохранить':  function () {
                                $.ajax({
                                url: "https://localhost:7289/api/Genre/",
                                method: 'PUT',
                                contentType: 'application/json',
                                data: JSON.stringify(
                                    {
                                        id: datas.id, Name: $('#ingen').val()
                                    }),
                                success: function () {
                                    CreateBodyGenre();
                                    $('#dialogcontent').remove();
                                },
                                error: function (x) {
                                    alert(x.status);
                                }
                            });
                        }
                    }
                });
        });

        $(".btnDelete").on("click", async function (e) {
            e.preventDefault();

            let datas = await $.ajax({
                url: "https://localhost:7289/api/Genre/" + $(this).data("genreid"),
                method: 'GET',
                contentType: "application/json",
                success: function (obj) {
                    return (obj);
                },
                error: function (obj) {
                    alert('err');
                    return null;
                }

            });


            $("<div id='dialogcontent'><label>Вы действительно хотите удалить жанр? </label></div>")
                .addClass('dialog')
                .appendTo('body')
                .dialog({
                    contentType: false,
                    processData: false,
                    title: $(this).attr("data-dialog-title"),
                    close: function () { $('#dialogcontent').remove() },
                    modal: true,
                    buttons: {
                        'Да, удалить!': async function () {

                            $.ajax({
                                url: "https://localhost:7289/api/Genre/" + datas.id,
                                method: 'DELETE',
                                contentType: "application/json",
                                data: JSON.stringify({ id: datas.id }),
                                success: function () {

                                    CreateBodyGenre();
                                    $('#dialogcontent').remove();
                                },
                                error: function (x) {
                                    alert(x.status);
                                }
                            });
                        },


                        'Нет , передумал!': function () {
                            $('#dialogcontent').remove();
                        }
                    }

                });

        });

        $(".btnCreate").on('click', function (e) {
            e.preventDefault();
            $("<div id='dialogcontent'><label>Название</label><input type='text' id='ingen'></input></label></div>")
                .addClass('dialog')
                .appendTo('body')
                .dialog({
                    contentType: false,
                    processData: false,
                    title: $(this).attr("data-dialog-title"),
                    close: function () { $('#dialogcontent').remove() },
                    modal: true,
                    buttons: {
                        'Создать': async function () {

                            $.ajax({
                                url: "https://localhost:7289/api/Genre/",
                                method: 'POST',
                                contentType: "application/json",
                                data: JSON.stringify({ Name: $('#ingen').val() }),
                                success: function () {
                                    alert("ok");
                                    CreateBodyGenre();
                                    $('#dialogcontent').remove();
                                },
                                error: function (x) {
                                    alert(x.status);
                                }
                            });
                        },


                        'Нет , передумал!': function () {
                            $('#dialogcontent').remove();
                        }
                    }

                });


        });

        $(".btnMediaManagment").on('click', function () {
            $('.adminContent').empty();
            $("#GenreManagment").removeClass('active');
            $("#GenreManagment").addClass('noactive');
            $("#AddManagment").addClass('active');
            $("#AddManagment").removeClass('noactive');
            $("#AccManagment").addClass('noactive');
            $("#AccManagment").removeClass('active');
            CreateMediaBody();


        });
        $(".btnAccManagment").on('click', function () {
            $('.adminContent').empty();
            CreateAccountBody();
            $("#GenreManagment").removeClass('active');
            $("#GenreManagment").addClass('noactive');
            $("#AddManagment").addClass('noactive');
            $("#AddManagment").removeClass('active');
            $("#AccManagment").addClass('active');
            $("#AccManagment").removeClass('noactive');
            

        });

        $("#btnAddManagment").on('click', function () {
            $('.adminContent').empty();
            $("#GenreManagment").removeClass('noactive');
            $("#GenreManagment").addClass('active');
            $("#AddManagment").addClass('noactive');
            $("#AddManagment").removeClass('active');
            $("#AccManagment").addClass('noactive');
            $("#AccManagment").removeClass('active');
            CreateBodyGenre();

        });



    }

    
    function CreateMediaBody() {
        $.ajax({
            url: 'https://localhost:7289/api/Media',
            type: 'GET',
            contentType: false,
            processData: false,
            success: function (response) {

                let rows = "<ul class='adminGenreContentUl'>";
                $.each(response, function (index, media) {
                    rows += rowMedia(media);
                });
                rows += "</ul><button class='bubbly-button btnCreateMedia' data-dialog-title='Создание'><span class='text'>Создать</span></button>";
                $(".adminContent").html(rows);


                ButtonsEventsMedia();
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);

            }
        });
        ButtonsEventsMedia();

    }
    
    function rowMedia(media) {

        let rows = "<li>" +
            "<div style='border:2px solid red; border-radius:10px; width:180px;'>" +
            "<span>" + media.name + "  " + "</span><span>" + media.artist + "</span>" +
            "</div>" +
            "<button class='bubbly-button  btnEditMedia' data-dialog-title='Редактирование' data-mediaid='" + media.id + "'>" +
            "<span class='text'>Изменить</span>" + "</button>" +
            "<button class='bubbly-button btnDeleteMedia' data-dialog-title='Удаление' data-mediaid='" + media.id + "'>" +
            "<span class='text'>Удалить</span>" + "</button>" + "<img src='https://localhost:7289/" + media.poster + "' style = 'width:50px'/>";
        return rows;
    }

    function ButtonsEventsMedia() {
     
        $('.btnEditMedia').on('click',async  function(e) {
            e.preventDefault();

            let datas = await $.ajax({
                url: "https://localhost:7289/api/Media/" + $(this).data("mediaid"),
                method: 'GET',
                contentType: "application/json",
                success: function (obj) {
                    return (obj);
                },
                error: function (obj) {
                    alert('err');
                    return null;
                }

            });
            console.log(datas);
            let formData = new FormData();
            $("<form multipart/form - data ><label>Название</label><br/><input type='text' value='"+datas.name +"'id='mediaName'/><br/>" +
                "<label>Исполнитель</label><br/><input type='text' value='"+datas.artist+"'id='mediaArtist'/><br/>" +
                "<label>Жанр</label><br/><input type='text' id='mediaGenre' value='"+datas.genre+"'/><br/>" +
                "<label>Mp3</label><br/><input type='file' id='mediaFile'/>"+
                "<label>Постер</label><br/><input type='file' id='posterFile'/>"+
                "</form>")
                .addClass('dialog')
                .appendTo('body')
                .dialog({
                    contentType: false,
                    processData: false,
                    close: function () { $('#dialogcontent').remove() },
                    modal: true,
                    buttons: {
                        'Сохранить': async function () {

                            formData.append("Id", datas.id);
                            formData.append("Name", $('#mediaName').val());
                            formData.append("Genre", $('#mediaGenre').val());
                            formData.append("Artist", $('#mediaArtist').val());
                            formData.append("mediaFile", $('#mediaFile')[0].files[0]);
                            formData.append("posterFile", $('#posterFile')[0].files[0]);
                            formData.append("Poster", datas.poster);
                            formData.append("FileAdress", datas.fileAdress);
                            formData.append("UserId", datas.userId);
                            let res = await fetch("https://localhost:7289/api/Media", {
                                method: 'PUT',
                                body: formData,

                            });
                            if (res.status === 200) {
                                console.log('ok');
                                $('.dialog').remove();
                                CreateMediaBody();
                               

                            }
                            
                        }
                    }

                });

            

//endMediaEdit
        });

        $('.btnDeleteMedia').on('click', function (e) {
           
            e.preventDefault();

            let idMedia = ($(this).attr('data-mediaid'));



            $('<div><span>Вы действительно хотите удалить эту песню? </span></div>')
                .addClass('dialog')
                .appendTo('body')
                .dialog({
                    contentType: false,
                    processData: false,
                    close: function () { $('#dialogcontent').remove() },
                    modal: true,
                    buttons: {
                        'Да, удалить!': async function () {

                            $.ajax({
                                url: "https://localhost:7289/api/Media/" + idMedia,
                                method: 'DELETE',
                                contentType: "application/json",
                                data: JSON.stringify({ id: idMedia }),
                                success: function () {
                                   
                                    alert("Удалено успешно!")
                                    $('.dialog').remove();
                                    CreateMediaBody();

                                },
                                error: function (x) {
                                    alert(x.status);
                                }
                            });
                        },


                        'Нет , передумал!': function () {
                            $('#dialogcontent').remove();
                        }
                    }




                    /**enddialog */
                });




            
        });

        $('.btnCreateMedia').on('click', function(e) {
            e.preventDefault();
            
            
          

            $("<div multipart/form-data><label>Название</label><br/><input type='text' id='mediaName'/><br/>"+
               "<label>Исполнитель</label><br/><input type='text' id='mediaArtist'/><br/>"+
                "<label>Жанр</label><br/><input type='text' id='mediaGenre' /><br/>"+
                "<label>Mp3</label><br/><input type='file' id='mediaFile' accept='.mp3'/>" +
                "<label>Постер</label><br/><input type='file' id='posterFile' accept='.jpg , .jpeg , .png , .gif'/>" +
                "</div>")
                .addClass('dialog')
                .appendTo('body')
                .dialog({
                    contentType: false,
                    processData: false,
                    close: function () { $('#dialogcontent').remove() },
                    modal: true,
                    buttons: {
                        'Создать': async function () {
                            let formData = new FormData();
                         
                            formData.append("Id", 0);
                            formData.append("mediaFile", $('#mediaFile')[0].files[0]);
                            formData.append("Name", $('#mediaName').val());
                            formData.append("Genre", $('#mediaGenre').val());
                            formData.append("Artist", $('#mediaArtist').val());
                            formData.append("posterFile", $('#posterFile')[0].files[0]);
                            
                          let res = await fetch("https://localhost:7289/api/Media" ,{
                                method: 'POST',
                                body: formData
                            });
                            if (res.status == 200) {
                                alert('Песня упешно добавлена');
                                $('.dialog').remove();
                                CreateMediaBody();
                            }
                            
                        }
                    }

                    });





        });



        

    }


    function CreateAccountBody() {
        $.ajax({
            url: 'https://localhost:7289/api/User',
            type: 'GET',
            contentType: false,
            processData: false,
            success: function (response) {

                let rows = "<ul class='adminGenreContentUl'>";
                $.each(response, function (index, user) {
                    rows += rowUser(user);
                });
                rows += "</ul><button class='btnCreateUser bubbly-button'data-dialog-title='Создание'><span class='text'>Создать</span></button>";
                $(".adminContent").html(rows);
                ButtonsEventsUsers();
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);

            }
        });
      
    }


    function rowUser(user) {
        let rows = "<li>" +
            "<div style='border:2px solid red; border-radius:10px; width:180px;'>" +
            "<span>" + user.firstName + " " + user.lastName + "   Права : " + user.userStatus + "</span>" +
            "</div>" +
            "<button class='bubbly-button btnEditUser' data-dialog-title='Редактирование' data-userid='" + user.id + "'>" +
            "<span class='text'>Изменить</span>" + "</button>" +
            "<button class='bubbly-button btnDeleteUser' data-dialog-title='Удаление' data-userid='" + user.id + "'>" +
            "<span class='text'>Удалить</span>" + "</button>";
        return rows;
    }

    function ButtonsEventsUsers() {
        $('.btnEditUser').on('click', async function (e) {

            e.preventDefault();

            let obj = await $.ajax({
                url: "https://localhost:7289/api/User/" + $(this).data("userid"),
                method: 'GET',
                contentType: "application/json",
                success: function (obj) {
                    return (obj);
                },
                error: function (obj) {
                    alert('err');
                    return null;
                }

            });
            console.log(obj);


            let str = $("<div><label>Имя</label><br/><input type='text' value='" + obj.firstName + "'id='userFirstName'/><br/>" +
                "<label>Фамилия</label><br/><input type='text' value='" + obj.lastName + "'id='userLastName'/><br/>" +
                "<label>Активен?</label><br/><input type='checkbox' value='ggg'  class='chkbox' id='usActive'/><br/>" +
                "<label>Статус : </label><span>" + obj.userStatus + "</span>" +
                "<fieldset><div><input type='radio' class='rbtn' id='user' name='status' value='user' />" +
                "<label for='user'>user</label></div>" +
                "<div><input value='admin' type='radio' class='rbtn' id='admin' name='status'>" +
                "<label for='dewey'>admin</label></div></fieldset >" +
                "</div>");
            str.addClass('dialog')
                .appendTo('body');
            $('#usActive').prop('checked', obj.active);


            str.dialog({
                contentType: false,
                processData: false,
                title: $(this).attr("data-dialog-title"),
                close: function () { $('#dialogcontent').remove() },
                modal: true,
                buttons: {
                    'сохранить': function () {
                        

                        let rbn = $('.rbtn');
                        let res = obj.userStatus;
                        $.each(rbn, (index, value) => {
                            if (value.checked === true) { res = (value.value) };
                        });



                        $.ajax({
                            url: "https://localhost:7289/api/User/",
                            method: 'PUT',
                            contentType: 'application/json',
                            data: JSON.stringify(
                                {
                                    Id: obj.id,
                                    Active: $('#usActive')[0].checked,
                                    FirstName: $('#userFirstName').val(),
                                    LastName: $('#userLastName').val(),
                                    UserStatus: res,
                                    Email: obj.email,
                                    Password: obj.password,
                                    Salt: obj.salt

                                }),
                            success: function () {
                                $('.dialog').remove();
                                CreateAccountBody();
                            },
                            error: function (x) {
                                alert(x.status);
                            }
                        });
                    }
                }

            });




            //endEditUser
        });


        $('.btnDeleteUser').on('click', async function (e) {
            e.preventDefault();
            let obj = await $.ajax({
                url: "https://localhost:7289/api/User/" + $(this).data("userid"),
                method: 'GET',
                contentType: "application/json",
                success: function (obj) {
                    return (obj);
                },
                error: function (obj) {
                    alert('err');
                    return null;
                }

            });


            $('<div><span>Вы действительно хотите удалить етого пользователя ? </span></div>')
                .addClass('dialog')
                .appendTo('body')
                .dialog({
                    contentType: false,
                    processData: false,
                    close: function () { $('#dialogcontent').remove() },
                    modal: true,
                    buttons: {
                        'Да, удалить!': async function () {

                            await $.ajax({
                                url: "https://localhost:7289/api/User/" + obj.id,
                                method: 'DELETE',
                                contentType: "application/json",
                                data: JSON.stringify({ id: obj.id }),
                                success: function () {
                                    alert("Удалено успешно!");
                                    $('.dialog').remove();
                                    CreateAccountBody();

                                },
                                error: function (x) {
                                    alert(x.status);
                                }
                            });
                        },


                        'Нет , передумал!': function () {
                            $('#dialogcontent').remove();
                        }
                    }




                    //endDeleteUser
                });
        });


        $('.btnCreateUser').on('click', function (e) {
            e.preventDefault();

            let str = $("<div><label>Имя</label><br/><input type='text' id='userFirstName'/><br/>" +
                "<label>Фамилия</label><br/><input type='text' id='userLastName'/><br/>" +
                "<label>Email</label><br/><input type='text' id='userEmail' /><br/>" +
                "<label>Password</label><br/><input type='text' id='userPassword'/>" +
                "</div>")
                .addClass('dialog')
                .appendTo('body')
                .dialog({
                    contentType: false,
                    processData: false,
                    close: function () { $('#dialogcontent').remove() },
                    modal: true,
                    buttons: {
                        'Создать': async function () {
                         

                            $.ajax({
                                url: "https://localhost:7289/api/User/",
                                method: 'POST',
                                contentType: "application/json",
                                data: JSON.stringify({
                                    FirstName: $('#userFirstName').val(),
                                    LastName: $('#userLastName').val(), 
                                    Email: $('#userEmail').val(), 
                                    Password: $('#userPassword').val(),

                                }),
                                success: function () {
                                    alert("Пользователь успешно добавлен");
                                    CreateAccountBody();
                                    $('.dialog').remove();
                                },
                                error: function (x) {
                                    alert(x.status);
                                }
                            });


                        }
                    }

                });







            //endCreateUser
        });

    }
});
