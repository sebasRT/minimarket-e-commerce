import Input from "./Input";
import {brands} from "../../productConsts";

const BrandInput = ({ showAt }: { showAt: number }) => {

    return (
        <>
                    <Input name="brand" label="Marca" showAt={showAt} list="brands"/>
                    <datalist id="brands">
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </datalist>

        </>
    )
}

export default BrandInput;