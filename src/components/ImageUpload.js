import React, {Component} from 'react'
import '../styles/Components.css'
import { ReactComponent as UploadIcon } from '../assets/svg/UploadIcon.svg';

export default class ImageUpload extends Component {
    constructor(props){
        super(props)
        this.state = {
          file: null
        }
        this.handleChange = this.handleChange.bind(this)
      }
      handleChange(event) {
        this.setState({
          file: URL.createObjectURL(event.target.files[0])
        })
      }
    render() {
        return (
            <div>
                <div className="position-relative">
                    <div className="img-container">
                        <div className="upload-img">
                        <UploadIcon />
                            <p className="text-align-center">{this.props.tap}</p>
                        </div>
                        <div className="for-image">
                            <input type="file" onChange={this.handleChange} className="custom-file-input"/>
                            <img src={this.state.file} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
