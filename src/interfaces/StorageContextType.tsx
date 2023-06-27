import PhoneInterface from "./PhoneInterface"
import PurchaseInterface from "./PurchaseInterface"
import SalesInterface from "./SalesInterface"

export default interface ContextType {
	storagePhones: PhoneInterface[] | undefined
	addingDevice: (
		form: PurchaseInterface,
		setForm: (object: PurchaseInterface) => void
	) => void
	deletingDevice: (id: string) => void
	updatingDevice: (
		form: SalesInterface,
		setForm: (object: SalesInterface) => void,
		id: string
	) => void
}
