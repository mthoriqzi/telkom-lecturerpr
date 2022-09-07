import React, {useState} from 'react'
import './modal.css'

const EditModal = (props) => {

  const item = props.data
  const inputDropdown = props.inputDropdown
  const inputManual = props.inputManual
  const editDB = props.editDB
  const setOpenModal = props.setOpenModal
  const generateDropdown = props.generateDropdown
  // console.log(generateDropdown)

  const [modalClass, setModalClass] = useState('modals')

  const dropdownOptions = generateDropdown(item)
  console.log(dropdownOptions)

  const onClose = () => {
    setOpenModal(false)
    setModalClass('')
  }

  const updateData = () => {
    editDB(item)
    setOpenModal(false)
  }

  return (
    <div class={modalClass} id="edit" aria-hidden="true" aria-labelledby="staticBackdropLabel" tabindex="-1" z-index="999" data-backdrop= "false">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit: {item.kode_nama}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
              </div>
              <div class="modal-body">
                {/* {inputDropdown("pendidikan_terakhir","Pendidikan terakhir",3)}
                {inputDropdown("kelompok_keahlian","Kelompok Keahlian",4)}
                {inputDropdown("inpassing","Inpassing",8)}
                {inputDropdown("sertifikasi","Sertifikasi",2)}
                {inputDropdown("program_studi","Program Studi",4)}
                {inputDropdown("status_kepegawaian","Status Kepegawaian",4)}
                {inputDropdown("jfa","JFA",4)} */}
                {/* {...dropdownOptions} */}
                {/* {...generateDropdown} */}
                {/* {generateDropdown.map(element => element)} */}
                {dropdownOptions.map(element => element)}
                {inputManual("number","dik_diakui","Dik Diakui",item.dik_diakui)}
                {inputManual("number","lit_diakui","Lit Diakui",item.lit_diakui)}
                {inputManual("number","abdimas_diakui","Abdimas Diakui",item.abdimas_diakui)}
                {inputManual("number","penunjang","Penunjang",item.penunjang)}
                {inputManual("number","prof_diakui","Prof Diakui",item.prof_diakui)}
                {inputManual("number","total_sks","Total SKS",item.total_sks)}
                {inputDropdown("pemenuhan_tridarma","Pemenuhan Tridharma",2)}
              </div>
              <div class="modal-footer">
                {/* <button type="button" class="btn btn-primary" onClick={() => editDB(dosen)} data-bs-dismiss="modal">Save changes</button> */}
                <button type="button" class="btn btn-primary" onClick={updateData} data-bs-dismiss="modal">Save changes</button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default EditModal
