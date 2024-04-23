jQuery(document).ready(function($){

    function createModal() {
        const modal = document.createElement('div')
        modal.className = 'float-form-modal'
        modal.innerHTML = `
            <div class="float-form-modal-wrapper">
                <div class="float-form-modal-header">
                    <span class="float-form-modal-title">Tip</span>
                    <span class="float-form-modal-close">&times;</span>
                </div>
                <div class="float-form-modal-content"></div>
            </div>
        `
        document.body.appendChild(modal)
        return modal
    }

    const formContent = document.getElementById("float-form-front-content")
    const form = formContent.getElementsByTagName('form')[0]
    form && form.blur()
    document.body.appendChild(formContent)

    const floatContainer = document.createElement('div')
    floatContainer.className = 'float-form-fixed'

    const imgIcon = document.createElement('img')
    imgIcon.src = my_ajax_obj.assets_url + 'assets/image/open.svg'
    imgIcon.style.width = '30px';
    imgIcon.style.height = '30px';
    floatContainer.appendChild(imgIcon)

    document.body.appendChild(floatContainer)

    floatContainer.onclick = function () {
        const modal = createModal()

        const modalContentSlot = modal.getElementsByClassName('float-form-modal-content')[0]
        formContent.style.display = 'block'
        modalContentSlot.appendChild(formContent)

        const modalClose = modal.getElementsByClassName('float-form-modal-close')[0]
        modalClose.onclick = function () {
            modal.remove()
        }
    }
});
