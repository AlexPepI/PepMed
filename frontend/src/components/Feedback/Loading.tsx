import { Loader } from '@mantine/core';

function Loading() {
  
  return(
    <div className="w-full h-[80vh] items-center flex justify-center py-10">
      <Loader size={35} />
    </div>
  )
}

export default Loading