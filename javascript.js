const inputs = document.getElementById("inputs");

var conversionContainers = [];

var selected = 0;

class conversionContainer
{
    constructor(id)
    {
        this.id = id;
        this.name = "";
        for (let i = 0; i < 5; i++) this.name += this.id;

        let element = document.createElement("input");
        
        element.setAttribute("type", "text");
        element.setAttribute("placeholder", "type something...");
        element.className = "text-input";



        this.inputElement = element;
    }

    getInputElement() { return this.inputElement; }
}

for (let i = 0; i < 1; i++)
{
    conversionContainers.push(new conversionContainer(i));
}

conversionContainers.forEach(e => {
    inputs.appendChild(e.getInputElement());
})

conversionContainers.forEach(c =>
{
    addEventListeners(c);
})

function addEventListeners(c)
{
    c.inputElement.addEventListener('keydown', function(e)
    {
        if (e.key === 'ArrowUp') selected--;
        if (e.key === 'ArrowDown') selected++;

        updateFocus();
    })

    c.inputElement.addEventListener('keyup', function(e)
    {
        if (e.key === "Backspace")
        {
            if (c.inputElement.value == "" && conversionContainers.length > 1 && selected > 0)
            {
                conversionContainers[selected].inputElement.remove();
                conversionContainers.splice(selected, 1);

                selected--;
            }
        }

        updateFocus();
    })

    c.inputElement.addEventListener('keypress', function(e)
    {
        if (e.key === 'Enter')
        {
            let element = new conversionContainer(0);

            addEventListeners(element);

            conversionContainers.splice(selected + 1, 0, element);
            inputs.insertBefore(element.inputElement, inputs.children[selected + 1]);
            selected ++;

            updateFocus();
        }

        
    })

    c.inputElement.addEventListener('click', function()
    {
        selected = conversionContainers.indexOf(c);
    })
}

function updateFocus()
{
    conversionContainers[selected].inputElement.focus();
}

