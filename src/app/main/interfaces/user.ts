export interface User { //is this being used
	fullname?: string
	email?: string
	phone?: string
	address?: string
	jobs?: Job[]
	education?: Education[]
	involvement?: Involvement[]
	personal?: Personal[]
}

export interface UserAccount {
	account_email: string
	promocode?:string
	cc_token: string
	password: string
	fullname?: string
	email?: string
	phone?: string
	address?: string
	resumetype?: number 
	jobs?: Job[]
	education?: Education[]
	involvement?: Involvement[]
	personal?: Personal[]
}

export interface Job {
	company?: string
	company_location?: string
	job_title?: string
	start_month?: string
	start_year?: string
	end_month?: string
	end_year?: string
	present?: boolean
	job_description?: JobDesc[]
}

export interface JobDesc {
	brief_description?: string[]
}

export interface Education {
	school?: string
	school_location?: string
	degree?: string
	grad_month?: string
	grad_year?: string
	education_description?: EducationDesc[]
}

export interface EducationDesc {
	brief_description?: string[]
}

export interface Involvement {
	involvement_name?: string
	position_title?: string
	start_month?: string
	start_year?: string
	end_month?: string
	end_year?: string
	involvement_description?: InvolvementDesc[]
}

export interface InvolvementDesc {
	brief_description?: string[]
}

export interface Personal {
	personal_details?: string[]
}

export interface Invoices {
	date?: number
	amount?: string
	paid?: boolean
	plan?: string
}
