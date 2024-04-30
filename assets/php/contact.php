<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
        
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Oops! Il y a un soucis. Merci de compléter les champs.";
        exit;
    }
    $to = "5608@holbertonstudents.com";

    // Sujet de l'e-mail
    $subject = "Nouveau message de contact depuis ton portfolio";

    // Corps de l'e-mail
    $body = "Nom: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message";

    // En-têtes de l'e-mail
    $headers = "From: $email";

    // Envoi de l'e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Message envoyé avec succès.";
    } else {
        echo "Une erreur s'est produite lors de l'envoi du message.";
    }
}
?>