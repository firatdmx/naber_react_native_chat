export default function (errorCode) {
    switch (errorCode) {
        case "auth/invalid-email":
            return "Geçersiz e-posta adresi."
            break;
        case "auth/user-not-found":
            return "Kullanıcı bulunamadı."
            break;
        case "auth/wrong-password":
            return "Girdiğiniz parola yanlış."
            break;
        case "auth/network-request-failed":
            return "Ağ hatası."
            break;
    
        default:
            return "Bir hata oluştu."
            break;
    }

}