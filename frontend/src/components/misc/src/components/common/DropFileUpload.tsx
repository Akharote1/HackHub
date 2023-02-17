import Dropzone from "react-dropzone";

function DropFileUpload({
  uploadFiles,
  multiple = true,
  height = '96px',
  text = null,
  accept = null
}) {
  const finalText = text ?? (
    multiple 
      ? ' upto 4 images'
      : ' an image'
  )
  return (
    <div className="flex justify-center mb-2">
      <Dropzone
        onDrop={uploadFiles}
        multiple={multiple}
        accept={accept ?? {
          'image/png': ['.png'],
          'image/jpg': ['.jpg', '.jpeg'],
        }}
      >
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="dropzone" style={{height}}>
                <div className="text-center">
                  <span className="text-primary">Browse</span> 
                  &nbsp;or Drag &amp; Drop 
                  {finalText}
                </div>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}


export default DropFileUpload;