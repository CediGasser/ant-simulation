<script>
    import { page } from '$app/stores';
    import { SvelteUIProvider, fns, AppShell, Navbar, Header, Footer, ShellSection, Burger, Group, Button, Stack, ActionIcon } from '@svelteuidev/core';

    let opened = false
</script>

<SvelteUIProvider ssr withGlobalStyles withNormalizeCSS>
    <AppShell
        override={{
            main: { 'dark-theme &': { bc: fns.themeColor('dark', 8) }, bc: fns.themeColor('gray', 0) }
        }}
        fixed
        navbarOffsetBreakpoint="sm"
    >
        <Header fixed slot="header" height={60} override={{ p: '$mdPX' }}>
            <Group position="apart">
                <Group spacing="sm">
                    <Burger 
                        opened={opened}
                        on:click={()=>opened = !opened}
                        aria-label="Open navigation"/>
                    <h1>Ant Simulation</h1>
                </Group>
                <nav>
                    <Group spacing="xs">
                        <Button href="/" variant={$page.url.pathname === '/' ? 'light' : 'subtle'}>Simulation</Button>
                        <Button href="/carpenterants" variant={$page.url.pathname === '/carpenterants' ? 'light' : 'subtle'}>Carpenter ants</Button>
                        <Button href="/fireants" variant={$page.url.pathname === '/fireants' ? 'light' : 'subtle'}>Fire ants</Button>
                    </Group>
                </nav>
                <Group>
                    <ActionIcon href="https://github.com/CediGasser/ant-simulation"/>
                </Group>
            </Group>
            
        </Header>

        <!-- Main content uses the default slot, so no need to explicitly declare it -->
        <ShellSection>
            <slot />
        </ShellSection>

        <Footer slot="footer">
            <footer>
                <p>The sources of the texts written on the info pages can be found in the documentation of the following 
                <a href="https://github.com/CediGasser/ant-simulation">GitHub repository</a>.</p>
            </footer>
        </Footer>
    </AppShell>
</SvelteUIProvider>

<style>
    footer {
        position: relative;
        padding: 10px 10px 0px 10px;
        bottom: 0;
        width: 100%;
        /* Height of the footer*/
        height: 40px;
        text-align: center;
    }
    nav {
        display: flex;
    }
</style>