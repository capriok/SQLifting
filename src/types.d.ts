declare module '*.scss';

type InputEvent = React.ChangeEvent<HTMLInputElement>
type FormEvent = React.ChangeEvent<HTMLFormElement>
type Reducer<S, A> = (prevState: S, action: A) => S

interface GlobalState {
	user: User
	weather: WeatherObject
	options: AppOptions
	components: ComponentsObject
	compositions: Compositions
	composites: Composites
}

interface ReducerAction {
	type: string
}

interface ContextProps {
	state: GlobalState
	dispatch: Dispatch<ReducerAction>
}

interface User {
	isAuthenticated: boolean,
	token: string,
	details: UserDetails
}

interface UserDetails {
	uid: string,
	username: string
}

interface WeatherObject {
	loading?: boolean
	timezone?: string
	temperature?: number
	humidity?: number
	description?: string
	icon?: string
	error?: string
}

interface ComponentsObject {
	sidebar: boolean
}

interface AppOptions {
	backgroundOption: string
	primaryOption: string
	secondaryOption: string
	tipsOption: boolean
	sidebarOption: boolean
	dropsOption: boolean
}

interface Compositions {
	equipments: Array
	muscles: Array
	exercises: Array
	movements: Array
}

interface Composites {
	circuits: Array
	exercises: Array
	workouts: Array
}

interface ManageState {
	ext: {
		preview: boolean
		select: boolean
		edit: boolean
	}
	preview: any,
	selection: Array
}

interface AssembleState {
	steps: Array
	activeStep: number
	entities: Array
	readyForNext: boolean
	currentBuild: string
	exerciseBuild: {
		name: string
		equipment: any
		muscle: any
		exercise: any
	},
	circuitBuild: {
		name: string,
		movements: Array
	},
	workoutBuild: {
		name: string
		exercises: Array,
		circuit: Array
	}
}

interface WorkoutState {
	preview: any
}

type SuccessState = boolean
type SetSuccessState = React.Dispatch<SuccessState>

type SetAcrd = React.Dispatch<Acrd>

type Acrd = {
	a?: boolean
	b?: boolean
	c?: boolean
	d?: boolean
}

interface ContentProps {
	setSidebar: () => void
}

interface OptionsProps {
	flipOptions: () => void
	setAcrd: SetAcrd
}