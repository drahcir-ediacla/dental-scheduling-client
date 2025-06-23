

const Services = () => {
    return (
        <section className="mb-8 max-w-4xl w-full">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">Our Services</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
                    Teeth Cleaning
                </li>
                <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
                    Tooth Extraction
                </li>
                <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
                    Braces & Orthodontics
                </li>
                <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
                    Cosmetic Dentistry
                </li>
                <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
                    Dental Implants
                </li>
                <li className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
                    Root Canal Treatment
                </li>
            </ul>
        </section>
    )
}

export default Services