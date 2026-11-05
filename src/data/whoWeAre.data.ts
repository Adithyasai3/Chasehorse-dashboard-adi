export interface WhoWeAreContent {
  eyebrow: string;
  heading: string;
  lead: string;
  story: {
    prefix: string;
    badgeText: string;
    suffix: string;
  };
}

export const WHO_WE_ARE_DATA: WhoWeAreContent = {
  eyebrow: 'Who we are',
  heading: 'Who we are',
  lead: 'CHASEHORSE is a technology-driven logistics and supply chain transformation company delivering innovative solutions across industries globally.',
  story: {
    prefix:
      'As a growth enabling partner, we orchestrated need-of-the-hour solutions engineered with futuristic capabilities. We pioneer a first-of-its-kind ',
    badgeText: 'Logistics-as-a-Service (LaaS) Platform',
    suffix:
      ' and beyond—offering a simplified, plug-and-play model equipped with pre-integrated, deployment-ready resources. By bridging complex, incompatible CX links, we strategically position our clients to step forward as absolute leaders in their respective markets.',
  },
};

