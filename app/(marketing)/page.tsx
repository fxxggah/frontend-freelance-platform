import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase, ShieldCheck, Zap, Code2, LineChart, Globe, MousePointer2 } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-emerald-100 selection:text-emerald-900">
            {/* Navbar */}
            <nav className="fixed top-4 inset-x-0 z-50 flex justify-center px-6">
                <div className="w-full max-w-7xl h-16 bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] rounded-2xl flex items-center justify-between px-6 transition-all duration-300 hover:shadow-[0_12px_40px_0_rgba(16,185,129,0.1)]">

                    {/* Logo */}
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-all duration-300">
                            <Briefcase size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-[950] tracking-tighter text-gray-900">
                            ClickJob<span className="text-emerald-500">.</span>
                        </span>
                    </div>

                    {/* Links de Navegação - Estilo Pill */}
                    <div className="hidden md:flex items-center bg-gray-100/50 p-1 rounded-full border border-gray-200/20">
                        <Link href="#como-funciona" className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-emerald-600 transition-all rounded-full hover:bg-white hover:shadow-sm">
                            Como funciona
                        </Link>
                        <Link href="#vantagens" className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-emerald-600 transition-all rounded-full hover:bg-white hover:shadow-sm">
                            Vantagens
                        </Link>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-2">
                        <Link href="/login">
                            <Button variant="ghost" className="hidden sm:flex font-bold text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-full transition-all">
                                Entrar
                            </Button>
                        </Link>
                        <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden sm:block" /> {/* Divisor vertical */}
                        <Link href="/register">
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl px-5 shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-all active:scale-95 text-xs uppercase tracking-wider">
                                Cadastrar
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-200/30 to-transparent blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <Badge className="bg-white text-emerald-700 border border-emerald-100 px-4 py-2 rounded-full font-bold uppercase tracking-widest text-[10px] mb-8 shadow-sm animate-bounce-slow">
                        A Nova Era do Freelance
                    </Badge>

                    <h1 className="text-6xl md:text-[84px] font-[900] text-gray-900 tracking-tight leading-[0.95] max-w-5xl mb-8">
                        Conectando talentos aos <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">
                            grandes projetos.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-500 font-medium max-w-2xl mb-12 leading-relaxed">
                        A plataforma definitiva para desenvolvedores, designers e criadores. Encontre projetos desafiadores ou contrate os melhores profissionais em só um lugar.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center">
                        <Link href="/register" className="w-full sm:w-auto">
                            <Button className="w-full h-16 px-10 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-lg font-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                                Quero trabalhar
                            </Button>
                        </Link>
                        <Link href="/register" className="w-full sm:w-auto">
                            <Button className="w-full h-16 px-10 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-lg font-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                                Quero contratar
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Social Proof / Stats Strip */}
            <section className="bg-white border-y border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-3 font-black uppercase tracking-[0.2em] text-xs"><Globe size={18} className="text-emerald-500" /> Vagas remotas </div>
                        <div className="flex items-center gap-3 font-black uppercase tracking-[0.2em] text-xs"><Code2 size={18} className="text-emerald-500" /> Vagas de TI</div>
                        <div className="flex items-center gap-3 font-black uppercase tracking-[0.2em] text-xs"><LineChart size={18} className="text-emerald-500" /> Ambiente Seguro</div>
                        <div className="flex items-center gap-3 font-black uppercase tracking-[0.2em] text-xs"><Zap size={18} className="text-emerald-500" /> Contratação Ágil</div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="vantagens" className="py-32 bg-[#fafafa]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6">
                                Por que escolher a ClickJob?
                            </h2>
                            <p className="text-gray-500 text-lg font-medium leading-relaxed">
                                Tudo que você precisa para gerenciar sua carreira ou seus projetos em um só lugar, com tecnologia de ponta.
                            </p>
                        </div>
                        <MousePointer2 className="hidden md:block text-emerald-200 -rotate-12 mb-4" size={48} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="group bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Conexão Imediata</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Nosso sistema conecta instantaneamente as vagas recém-publicadas aos freelancers mais qualificados disponíveis.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 md:translate-y-8">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Ambiente Seguro</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Processo de candidatura transparente com acompanhamento de status em tempo real, garantindo segurança para ambas as partes.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-500">
                            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                                <Briefcase size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Gestão Centralizada</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Acompanhe todas as suas propostas, vagas publicadas e candidatos diretamente do seu dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-12 md:py-24 px-4 md:px-6">
                <div className="max-w-6xl mx-auto bg-gray-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl">
                    {/* Shapes abstratos - Ajustados para não "vazarem" mobile */}
                    <div className="absolute -top-12 -right-12 md:-top-24 md:-right-24 w-40 h-40 md:w-80 md:h-80 bg-emerald-500/20 blur-[60px] md:blur-[80px] rounded-full" />
                    <div className="absolute -bottom-12 -left-12 md:-bottom-24 md:-left-24 w-40 h-40 md:w-80 md:h-80 bg-teal-500/10 blur-[60px] md:blur-[80px] rounded-full" />

                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 md:mb-8 relative z-10 leading-[1.1]">
                        Pronto para o <br className="hidden sm:block" /> próximo nível?
                    </h2>

                    <p className="text-gray-400 text-base md:text-xl font-medium mb-10 md:mb-12 max-w-2xl mx-auto relative z-10">
                        Junte-se a milhares de profissionais e empresas que já estão construindo o futuro do trabalho juntos.
                    </p>

                    <Link href="/register" className="relative z-10 inline-block group w-full sm:w-auto">
                        <Button className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 bg-emerald-500 hover:bg-emerald-400 text-gray-900 text-lg md:text-xl font-black rounded-xl md:rounded-2xl shadow-xl shadow-emerald-500/20 transition-all group-hover:-translate-y-1">
                            COMEÇAR AGORA
                        </Button>
                        <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity hidden sm:block" />
                    </Link>
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-16 text-center">
                <div className="flex items-center justify-center gap-2 mb-6 grayscale opacity-60">
                    <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
                        <Briefcase size={12} className="text-white" />
                    </div>
                    <span className="font-black tracking-tighter text-gray-900">ClickJob</span>
                </div>
                <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} ClickJob. Todos os direitos reservados.
                </p>
            </footer>
        </div>
    )
}