import { CookiesHandler } from "@/cookies";
import { ICompany } from "@/interfaces/ICompany";
import { create } from "zustand";

export interface CompanyPropsState {
  actual_company: ICompany | null;
  companies: ICompany[] | null;
}

interface CompanyState {
  company: CompanyPropsState;
  companyHandle: (obj: CompanyPropsState) => void;
  companyUpdate: (obj: Partial<CompanyPropsState>) => void;
  companyRecovery: () => Promise<boolean>;
  companyLogout: () => boolean;
}

export const useCompanyStore = create<CompanyState>(set => ({
  company: {
    actual_company: null,
    companies: [],
  },
  companyHandle: (obj: CompanyPropsState) => {
    CookiesHandler.company.set(obj);
    return set({ company: obj });
  },
  companyUpdate: (obj: Partial<CompanyPropsState>) => {
    return set(state => ({ company: { ...state.company, ...obj } }));
  },
  companyRecovery: async () => {
    const company = await CookiesHandler.company.get();
    if (company) {
      set({ company });
      return !!company?.actual_company;
    }
    return false;
  },
  companyLogout: () => {
    CookiesHandler.company.remove();
    set({
      company: {
        actual_company: null,
        companies: [],
      },
    });
    return true;
  },
}));
