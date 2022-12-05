const PageFooter = () => {
    return (
        <footer style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            marginTop: 'auto',
        }}>
            <p style={{
                fontSize: '0.8rem',
                color: '#999',
            }}>
                Desenvolvido com ❤️ por <a href="https://github.com/lavyoliveira" target={ "_blank" }>@lavyoliveira</a> e <a href="https://github.com/wendel-nogueira" target={ "_blank" }>@wendel-nogueira</a>
            </p>
        </footer>
    )
}

export default function Footer() {
    return (
        <PageFooter/>
    )
}