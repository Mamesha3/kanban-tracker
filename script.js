let h3Done = document.querySelector('.header .don') // last tasks container h3 after content
let h3In = document.querySelector('.header .in') // second tasks container h3 after content
let h3ToDo = document.querySelector('.header .do') // first tasks container h3 after content
let countTaskDo = 0;
let countTaskIn = 0;
let countTaskdone = 0;

// to get code click here
document.querySelector('.code_sign').addEventListener('click',function () {
      let code = document.querySelector('.code_here')
      code.classList.toggle('showhere')
      document.querySelector('.code_sign').innerHTML = '➡️'
})

// create task give taken input value for p tag
function createTask(inputV, taskContainer) {
   const task = document.createElement('div')
   task.className = 'task'
   task.innerHTML = `
        <p class="content">
            ${inputV}
        </p>
        <div class="btn_container">
            <button class="edit"><i class="fa-solid fa-edit"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
   `

   taskContainer.appendChild(task)
}

// create input first and take it's value
function createInput(two) {
    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'add_task_content'

    two.appendChild(input)
}

// when add button clicked add task
document.addEventListener('click', (e) => {
    if (e.target.matches('.add .fa-add')) {
        if (e.target.closest('.todo')) {
            let two = document.querySelector('.one')
            createInput(two)
            document.querySelector('.wahid').innerHTML = ''
            return
        }
        if (e.target.closest('.progress')) {
            let two = document.querySelector('.two')
            createInput(two)
            document.querySelector('.esnan').innerHTML = ''
            return
        }
        if (e.target.closest('.done')) {
            let two = document.querySelector('.three')
            createInput(two)
            document.querySelector('.selasi').innerHTML = ''
            return
        }
        
    }
})

// to add tasks when input blur
document.addEventListener('focusout', (e) => {
    if (e.target.matches('.add_task_content')) {
       let inputV = e.target.value
       if (e.target.closest('.one')) {
        // countTaskDo++
        let taskContainer = document.querySelector('#one')
        createTask(inputV, taskContainer)
        e.target.style.display = 'none'
        h3ToDo.style.setProperty('--after-text', `"${document.querySelectorAll('#one .task').length}"`)
       }
       if (e.target.closest('.two')) {
        // countTaskIn++
        let taskContainer = document.querySelector('#two')
        createTask(inputV, taskContainer)
        e.target.style.display = 'none'
        h3In.style.setProperty('--after-text', `"${document.querySelectorAll('#two .task').length}"`)
       }
       if (e.target.closest('.three')) {
        // countTaskdone++
        let taskContainer = document.querySelector('#three')
        createTask(inputV, taskContainer)
        e.target.style.display = 'none'
        h3Done.style.setProperty('--after-text', `"${document.querySelectorAll('#three .task').length}"`)
       }
       return
   }
})
// when delete button clicked
document.addEventListener('click', e => {
    if (e.target.matches('.fa-trash')) {
        let tasks = e.target.closest('.task')
        if(e.target.closest('#one')) {
            tasks.remove()
            // countTaskDo--
            h3ToDo.style.setProperty('--after-text', `"${document.querySelectorAll('#one .task').length}"`)
        }
        if(e.target.closest('#two')) {
            tasks.remove()
            // countTaskIn--
            h3In.style.setProperty('--after-text', `"${document.querySelectorAll('#two .task').length}"`)
        }
        if(e.target.closest('#three')) {
            tasks.remove()
            // countTaskdone--
            h3Done.style.setProperty('--after-text', `"${document.querySelectorAll('#three .task').length}"`)
        }
    }
})
// when edit button clicked
document.addEventListener('click', e => {
    if (e.target.matches('.fa-edit')) {
        let tasks = e.target.closest('.task')
        if(e.target.closest('#one')) {
            tasks.remove()
            // countTaskDo--
            h3ToDo.style.setProperty('--after-text', `"${document.querySelectorAll('#one .task').length}"`)
            let two = document.querySelector('.one')
            createInput(two)
        }
        if(e.target.closest('#two')) {
            tasks.remove()
            // countTaskIn--
            h3In.style.setProperty('--after-text', `"${document.querySelectorAll('#two .task').length}"`)
            let two = document.querySelector('.two')
            createInput(two)
        }
        if(e.target.closest('#three')) {
            tasks.remove()
            // countTaskdone--
            h3Done.style.setProperty('--after-text', `"${document.querySelectorAll('#three .task').length}"`)
            let two = document.querySelector('.three')
            createInput(two)
        }
    }
})

// drag and drop functionality
document.addEventListener('dragstart', e => {
  if(e.target.matches('.task')) {
     e.target.draggable = 'true'
     e.target.classList.add('taskopacity')
  }
})
document.addEventListener('dragend', e => {
  if(e.target.matches('.task')) {
    e.target.classList.remove('taskopacity')
  }
})

document.addEventListener('dragover', e => {
    e.preventDefault()
  if(e.target.matches('.added_task')) {
    let draggedItem = document.querySelector('.taskopacity')
    let afterElement = getBound(e.target, e.clientY)

    if (afterElement == null) {
        e.target.appendChild(draggedItem)
    }else {
        e.target.insertBefore(draggedItem, afterElement)
    }
    
  }
})

function getBound(container, y) {
    let containes = [...container.querySelectorAll('.task:not(.taskopacity)')]

    return containes.reduce((closest, child) => {
        let boxBound = child.getBoundingClientRect()
        let offset = y - boxBound.top - (boxBound.height / 2)

        if (offset < 0 && offset > closest.offset) {
            return {offset, element: child}
        }else {
            return closest
        }

    }, {offset: Number.NEGATIVE_INFINITY}).element
}
// drag and drop functionality close


// function saveData() {
//     let tasks = []
//     document.querySelectorAll('.content').forEach(text => {
//         tasks.push(text.textContent)
//     })

//     localStorage.setItem('kandan', JSON.stringify(tasks))
// }

// function renderAll() {
//     let tasks = JSON.parse(localStorage.getItem('kandan')) || []
//     let taskContainer = document.querySelector('#added_task')
//     tasks.forEach(text => {
//         createTask(text, taskContainer)
//     })
// }

// renderAll()