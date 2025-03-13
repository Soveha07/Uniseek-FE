export const Button = ({ children, onClick, variant = 'primary' }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' }) => {
    const baseStyles = "px-4 py-2 rounded-md font-semibold transition";
    const variantStyles = variant === 'primary' ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 text-black hover:bg-gray-300";

    return (
        <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
            {children}
        </button>
    );
};