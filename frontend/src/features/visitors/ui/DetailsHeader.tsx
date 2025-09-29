import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";


type Props = {
  name:string | null;
  surname:string | null;
  amka:string | null | undefined;
}

const DetailsHeader = ({name,surname,amka}:Props) => {

  const smallerThanMd = useMediaQuery("(max-width: 768px)");

    return(
       <div className="mt-4 flex flex-col gap-4 items-center md:justify-between md:flex-row">
          <Title
            order={1}
            style={{
              fontSize: smallerThanMd ? "1.8rem" : "2.5rem",
              marginLeft: smallerThanMd ? "" : "2rem",
            }}
          >
            {name} {surname}
          </Title>
          <div className="flex items-center md:mt-3 md:ml-10">
            <Title
              order={3}
              style={{
                fontSize: smallerThanMd ? "1rem" : "",
                marginRight: smallerThanMd ? "" : "2rem",
              }}
            >
              {amka!==null && amka!==undefined && <>Personal Number : {amka}</>}
            </Title>
          </div>
        </div>
    )
}
export default DetailsHeader