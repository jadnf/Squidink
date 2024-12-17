


function init()
{


}



function HotKeys() {
    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'z') {

            // Prevent the default browser save action\

            event.preventDefault();

            // if (actionHistroy.length > 0)
            // {
            //     actionHistroy = 
            // }

            console.log('Ctrl+Z pressed!');
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'y') {

            // Prevent the default browser save action

            event.preventDefault();

            // Do something when Ctrl+Yis pressed



            console.log('Ctrl+Y pressed!');
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key == 'r') {
            event.preventDefault();
            clear();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key == 'e') {

            event.preventDefault();
            tool = "eraser";
        } 
    });

    document.addEventListener('keydown', function (event) {
       if (event.key == 'p') {

        event.preventDefault();
        tool = "pen";
       } 
    });

    document.addEventListener('keydown', function (event) {
        if (event.key == 'b') {

            event.preventDefault();
            tool = "airbrush";
        }
    });
}