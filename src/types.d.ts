declare module '*.scss';

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
	dispatch: React.Dispatch<ReducerAction>
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
	equipments: any[]
	muscles: any[]
	exercises: any[]
	movements: any[]
}

interface Composites {
	circuits: any[]
	exercises: any[]
	workouts: any[]
}

interface ManageState {
	ext: {
		preview: boolean
		select: boolean
		edit: boolean
	}
	preview: any,
	selection: any[]
}

interface AssembleState {
	steps: any[]
	activeStep: number
	entities: any[]
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
		movements: any[]
	},
	workoutBuild: {
		name: string
		exercises: any[]
		circuit: any[]
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