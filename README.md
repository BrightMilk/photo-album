# photo-album
*ПроДокторов (МедРейтинг)*
Цель проекта: реализация фотоальбома.
Реализация фотоальбома представляет собой HTML - документ с подключенным JavaScript - сценарием и стилями CSS.
 1. Скрипт *script.js* получает по AJAX список фото: jsonplaceholder.typicode.com/photos?albumId=1 и обрабатывает её для дальнейшего использования;
 2. На основе полученной информации формируются список превью изображений (*150x150*) и изображение в полноразмерном формате (*600x600*) (под ним же находится название);
 3. При нажатии на превью изображение соответственно выводится полноразмерный формат и подпись;
 4. Название изображения отформатировано в соответствии с заданием (удалены все слова, состоящие из 3-х и менее букв);
 5. В качестве бонуса реализовано переключение по альбомам.
