$(function() {
    $('.Checkle').click(function() {
        var lines = $('#hsplar').val().split('\n');
        for (var i = 0; i < lines.length; i++) {
            $.post("incim/islem.php", {
                hsp: lines[i]
            }, function(data) {
                data = JSON.parse(data);
                if (data.sonuc == "errorInvalidCredentials") {
                    $("#calismayanlar")[0].value += data.ghesap + "\n";
                } else if (data.sonuc == "Family") {
                    $("#calisanlar")[0].value += data.ghesap + "|Family-Premium" + "\n";
                    $("#temizler")[0].value += data.ghesap + "\n";
                } else if (data.sonuc == "PREMIUM") {
                    $("#calisanlar")[0].value += data.ghesap + "|Premium" + "\n";
                    $("#temizler")[0].value += data.ghesap + "\n";
                } else if (data.sonuc == "FREE") {
                    $("#freehesaplar")[0].value += data.ghesap + "\n";
                }
                writeInfo();
            });
        }
    });

    function getSuccessLength() {
        var success = $("#calisanlar")[0].value.toString().split("\n");
        return success.length - 1;
    }

    function getFailLength() {
        var fail = $("#calismayanlar")[0].value.toString().split("\n");
        return fail.length - 1;
    }

    function getFreeLength() {
        var Free = $("#freehesaplar")[0].value.toString().split("\n");
        return Free.length - 1;
    }

    function writeInfo() {
        $("#toplam").text(getSuccessLength() + " Adet Premium Hesap |   " + getFreeLength() + " Adet Free Hesap |    " + getFailLength() + " Adet Çalışamayan Hesap  |  Toplamda   " + (getSuccessLength() + getFreeLength() + getFailLength()) + " Adet Hesap Denendi.");;
    }
    
   
    
});